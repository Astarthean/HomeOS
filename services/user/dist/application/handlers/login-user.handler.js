"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserHandler = void 0;
const common_1 = require("@nestjs/common");
const email_vo_1 = require("../../domain/value-objects/email.vo");
const invalid_credentials_exception_1 = require("../../domain/exceptions/invalid-credentials.exception");
let LoginUserHandler = class LoginUserHandler {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(command) {
        const email = new email_vo_1.Email(command.email);
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new invalid_credentials_exception_1.InvalidCredentialsException();
        }
        const isPasswordValid = await user.validatePassword(command.passwordPlain);
        if (!isPasswordValid) {
            throw new invalid_credentials_exception_1.InvalidCredentialsException();
        }
        return user;
    }
};
exports.LoginUserHandler = LoginUserHandler;
exports.LoginUserHandler = LoginUserHandler = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('UserRepository')),
    __metadata("design:paramtypes", [Object])
], LoginUserHandler);
//# sourceMappingURL=login-user.handler.js.map