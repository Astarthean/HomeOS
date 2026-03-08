"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidCredentialsException = void 0;
const domain_exception_1 = require("./domain.exception");
class InvalidCredentialsException extends domain_exception_1.DomainException {
    constructor() {
        super('Email o contraseña incorrectos');
    }
}
exports.InvalidCredentialsException = InvalidCredentialsException;
//# sourceMappingURL=invalid-credentials.exception.js.map