import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const LoginUserSchema = z.object({
  email: z.email('El formato del email no es válido'),
  password: z.string().min(1, 'La contraseña es obligatoria'),
});

export class LoginUserDto extends createZodDto(LoginUserSchema) {}
