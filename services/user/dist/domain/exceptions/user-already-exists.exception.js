"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAlreadyExistsException = void 0;
const domain_exception_1 = require("./domain.exception");
class UserAlreadyExistsException extends domain_exception_1.DomainException {
    constructor(email) {
        super(`El usuario con email ${email} ya existe`);
    }
}
exports.UserAlreadyExistsException = UserAlreadyExistsException;
//# sourceMappingURL=user-already-exists.exception.js.map