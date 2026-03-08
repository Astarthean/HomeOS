"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserId = void 0;
const uuid_1 = require("uuid");
class UserId {
    value;
    static generate() {
        return new UserId((0, uuid_1.v4)());
    }
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