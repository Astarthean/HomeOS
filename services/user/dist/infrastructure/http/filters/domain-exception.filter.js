"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const domain_exception_1 = require("../../../domain/exceptions/domain.exception");
const user_already_exists_exception_1 = require("../../../domain/exceptions/user-already-exists.exception");
const user_id_already_exists_exception_1 = require("../../../domain/exceptions/user-id-already-exists.exception");
let DomainExceptionFilter = class DomainExceptionFilter {
    catch(exception, host) {
        console.error('--- EXCEPTION CAUGHT BY FILTER ---');
        console.error(exception);
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        let status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Error interno del servidor';
        let error = 'InternalServerError';
        if (exception instanceof domain_exception_1.DomainException) {
            status = common_1.HttpStatus.BAD_REQUEST;
            message = exception.message;
            error = exception.name;
            if (exception instanceof user_already_exists_exception_1.UserAlreadyExistsException || exception instanceof user_id_already_exists_exception_1.UserIdAlreadyExistsException) {
                status = common_1.HttpStatus.CONFLICT;
            }
        }
        else if (exception instanceof common_1.HttpException) {
            status = exception.getStatus();
            const res = exception.getResponse();
            message = res.message || exception.message;
            error = res.error || exception.name;
        }
        else if (this.isMongoDuplicateError(exception)) {
            status = common_1.HttpStatus.CONFLICT;
            message = 'Ya existe un registro con esos datos (Duplicado)';
            error = 'DuplicateEntryError';
        }
        else if (exception instanceof Error) {
            message = exception.message;
            error = exception.name;
        }
        response.status(status).json({
            statusCode: status,
            message,
            error,
        });
    }
    isMongoDuplicateError(exception) {
        return exception.code === 11000 || (exception.errorResponse && exception.errorResponse.code === 11000);
    }
};
exports.DomainExceptionFilter = DomainExceptionFilter;
exports.DomainExceptionFilter = DomainExceptionFilter = __decorate([
    (0, common_1.Catch)()
], DomainExceptionFilter);
//# sourceMappingURL=domain-exception.filter.js.map