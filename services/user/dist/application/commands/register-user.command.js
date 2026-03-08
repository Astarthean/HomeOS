"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUserCommand = void 0;
class RegisterUserCommand {
    id;
    email;
    passwordPlain;
    constructor(id, email, passwordPlain) {
        this.id = id;
        this.email = email;
        this.passwordPlain = passwordPlain;
    }
}
exports.RegisterUserCommand = RegisterUserCommand;
//# sourceMappingURL=register-user.command.js.map