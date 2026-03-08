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
exports.LoginWithGoogleHandler = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../../domain/entities/user.entity");
const email_vo_1 = require("../../domain/value-objects/email.vo");
const user_id_vo_1 = require("../../domain/value-objects/user-id.vo");
let LoginWithGoogleHandler = class LoginWithGoogleHandler {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(command) {
        let user = await this.userRepository.findByGoogleId(command.googleId);
        if (user)
            return user;
        const email = new email_vo_1.Email(command.email);
        user = await this.userRepository.findByEmail(email);
        if (user) {
            user.updateGoogleId(command.googleId);
            await this.userRepository.save(user);
            return user;
        }
        const newUser = user_entity_1.User.create(user_id_vo_1.UserId.generate(), email, null, command.googleId);
        await this.userRepository.save(newUser);
        return newUser;
    }
};
exports.LoginWithGoogleHandler = LoginWithGoogleHandler;
exports.LoginWithGoogleHandler = LoginWithGoogleHandler = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('UserRepository')),
    __metadata("design:paramtypes", [Object])
], LoginWithGoogleHandler);
//# sourceMappingURL=login-with-google.handler.js.map