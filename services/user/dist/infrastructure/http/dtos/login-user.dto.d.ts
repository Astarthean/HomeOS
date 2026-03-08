import { z } from 'zod';
export declare const LoginUserSchema: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
declare const LoginUserDto_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>, false>;
export declare class LoginUserDto extends LoginUserDto_base {
}
export {};
