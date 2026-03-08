"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUserDto = exports.RegisterUserSchema = void 0;
const zod_1 = require("zod");
const nestjs_zod_1 = require("nestjs-zod");
exports.RegisterUserSchema = zod_1.z.object({
    id: zod_1.z.uuid('El formato del ID no es un UUID válido').optional(),
    email: zod_1.z.email('El formato del email no es válido'),
    password: zod_1.z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});
class RegisterUserDto extends (0, nestjs_zod_1.createZodDto)(exports.RegisterUserSchema) {
}
exports.RegisterUserDto = RegisterUserDto;
//# sourceMappingURL=register-user.dto.js.map