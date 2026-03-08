"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    id;
    email;
    passwordHash;
    constructor(id, email, passwordHash) {
        this.id = id;
        this.email = email;
        this.passwordHash = passwordHash;
    }
    getId() {
        return this.id;
    }
    getEmail() {
        return this.email;
    }
    getPasswordHash() {
        return this.passwordHash;
    }
    static create(id, email, passwordHash) {
        return new User(id, email, passwordHash);
    }
}
exports.User = User;
//# sourceMappingURL=user.entity.js.map