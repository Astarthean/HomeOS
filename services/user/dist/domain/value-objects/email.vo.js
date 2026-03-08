"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
class Email {
    value;
    constructor(value) {
        this.value = value;
        if (!this.validateEmail(this.value)) {
            throw new Error('Invalid email');
        }
    }
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    getValue() {
        return this.value;
    }
    toString() {
        return this.value;
    }
}
exports.Email = Email;
//# sourceMappingURL=email.vo.js.map