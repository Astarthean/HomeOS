"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const user_schema_1 = require("./infrastructure/persistence/mongoose/schemas/user.schema");
const mongoose_user_repository_1 = require("./infrastructure/persistence/mongoose/repositories/mongoose-user.repository");
const register_user_handler_1 = require("./application/handlers/register-user.handler");
const login_user_handler_1 = require("./application/handlers/login-user.handler");
const login_with_google_handler_1 = require("./application/handlers/login-with-google.handler");
const register_user_controller_1 = require("./infrastructure/http/controllers/register-user.controller");
const login_user_controller_1 = require("./infrastructure/http/controllers/login-user.controller");
const core_1 = require("@nestjs/core");
const domain_exception_filter_1 = require("./infrastructure/http/filters/domain-exception.filter");
const jwt_strategy_1 = require("./infrastructure/auth/strategies/jwt.strategy");
const google_strategy_1 = require("./infrastructure/auth/strategies/google.strategy");
const auth_controller_1 = require("./infrastructure/http/controllers/auth.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    uri: config.get('MONGODB_URI'),
                }),
            }),
            mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_1.UserSchema }]),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    secret: config.get('JWT_SECRET'),
                    signOptions: { expiresIn: '1h' },
                }),
            }),
        ],
        controllers: [register_user_controller_1.RegisterUserController, login_user_controller_1.LoginUserController, auth_controller_1.AuthController],
        providers: [
            register_user_handler_1.RegisterUserHandler,
            login_user_handler_1.LoginUserHandler,
            login_with_google_handler_1.LoginWithGoogleHandler,
            jwt_strategy_1.JwtStrategy,
            google_strategy_1.GoogleStrategy,
            {
                provide: 'UserRepository',
                useClass: mongoose_user_repository_1.MongooseUserRepository,
            },
            {
                provide: core_1.APP_FILTER,
                useClass: domain_exception_filter_1.DomainExceptionFilter,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map