"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserIdAlreadyExistsException = void 0;
const domain_exception_1 = require("./domain.exception");
class UserIdAlreadyExistsException extends domain_exception_1.DomainException {
    constructor(id) {
        super(`El usuario con ID ${id} ya existe`);
    }
}
exports.UserIdAlreadyExistsException = UserIdAlreadyExistsException;
//# sourceMappingURL=user-id-already-exists.exception.js.map