import { z } from 'zod';
export declare const RegisterUserSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodUUID>;
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
declare const RegisterUserDto_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    id: z.ZodOptional<z.ZodUUID>;
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>, false>;
export declare class RegisterUserDto extends RegisterUserDto_base {
}
export {};
