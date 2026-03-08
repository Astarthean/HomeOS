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
exports.RegisterUserController = void 0;
const common_1 = require("@nestjs/common");
const register_user_handler_1 = require("../../../application/handlers/register-user.handler");
const register_user_command_1 = require("../../../application/commands/register-user.command");
const register_user_dto_1 = require("../dtos/register-user.dto");
const uuid_1 = require("uuid");
let RegisterUserController = class RegisterUserController {
    registerUserHandler;
    constructor(registerUserHandler) {
        this.registerUserHandler = registerUserHandler;
    }
    async register(dto) {
        const command = new register_user_command_1.RegisterUserCommand(dto.id ?? (0, uuid_1.v4)(), dto.email, dto.password);
        await this.registerUserHandler.execute(command);
    }
};
exports.RegisterUserController = RegisterUserController;
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_user_dto_1.RegisterUserDto]),
    __metadata("design:returntype", Promise)
], RegisterUserController.prototype, "register", null);
exports.RegisterUserController = RegisterUserController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [register_user_handler_1.RegisterUserHandler])
], RegisterUserController);
//# sourceMappingURL=register-user.controller.js.map