"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordHash = void 0;
class PasswordHash {
    value;
    constructor(value) {
        this.value = value;
        if (!value || value.length < 6) {
            throw new Error('Password hash is invalid or too short');
        }
    }
    getValue() {
        return this.value;
    }
}
exports.PasswordHash = PasswordHash;
//# sourceMappingURL=password-hash.vo.js.map