import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const RegisterUserSchema = z.object({
  id: z.uuid('El formato del ID no es un UUID válido').optional(),
  email: z.email('El formato del email no es válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export class RegisterUserDto extends createZodDto(RegisterUserSchema) {}
