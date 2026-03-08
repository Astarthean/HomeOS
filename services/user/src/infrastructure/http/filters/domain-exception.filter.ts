import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { DomainException } from '../../../domain/exceptions/domain.exception';
import { UserAlreadyExistsException } from '../../../domain/exceptions/user-already-exists.exception';
import { UserIdAlreadyExistsException } from '../../../domain/exceptions/user-id-already-exists.exception';

@Catch()
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.error('--- EXCEPTION CAUGHT BY FILTER ---');
    console.error(exception);
    
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Error interno del servidor';
    let error = 'InternalServerError';

    if (exception instanceof DomainException) {
      status = HttpStatus.BAD_REQUEST;
      message = exception.message;
      error = exception.name;

      if (exception instanceof UserAlreadyExistsException || exception instanceof UserIdAlreadyExistsException) {
        status = HttpStatus.CONFLICT;
      }
    } else if (this.isMongoDuplicateError(exception)) {
      status = HttpStatus.CONFLICT;
      message = 'Ya existe un registro con esos datos (Duplicado)';
      error = 'DuplicateEntryError';
    } else if (exception instanceof Error) {
      message = exception.message;
      error = exception.name;
    }

    response.status(status).json({
      statusCode: status,
      message,
      error,
    });
  }

  private isMongoDuplicateError(exception: any): boolean {
    return exception.code === 11000 || (exception.errorResponse && exception.errorResponse.code === 11000);
  }
}
