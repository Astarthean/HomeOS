"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserDto = exports.LoginUserSchema = void 0;
const zod_1 = require("zod");
const nestjs_zod_1 = require("nestjs-zod");
exports.LoginUserSchema = zod_1.z.object({
    email: zod_1.z.email('El formato del email no es válido'),
    password: zod_1.z.string().min(1, 'La contraseña es obligatoria'),
});
class LoginUserDto extends (0, nestjs_zod_1.createZodDto)(exports.LoginUserSchema) {
}
exports.LoginUserDto = LoginUserDto;
//# sourceMappingURL=login-user.dto.js.map