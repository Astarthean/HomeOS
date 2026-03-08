"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserId = void 0;
const uuid_1 = require("uuid");
class UserId {
    value;
    constructor(value) {
        this.value = value;
        if (!(0, uuid_1.validate)(value)) {
            throw new Error(`Invalid UserId: ${value}`);
        }
    }
    getValue() {
        return this.value;
    }
    toString() {
        return this.value;
    }
}
exports.UserId = UserId;
//# sourceMappingURL=user-id.vo.js.map