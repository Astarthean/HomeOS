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
exports.MongooseUserRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_entity_1 = require("../../../../domain/entities/user.entity");
const email_vo_1 = require("../../../../domain/value-objects/email.vo");
const password_hash_vo_1 = require("../../../../domain/value-objects/password-hash.vo");
const user_id_vo_1 = require("../../../../domain/value-objects/user-id.vo");
const user_schema_1 = require("../schemas/user.schema");
let MongooseUserRepository = class MongooseUserRepository {
    userModel;
    constructor(userModel) {
        this.userModel = userModel;
    }
    async save(user) {
        const id = user.getId().getValue();
        const data = {
            _id: id,
            email: user.getEmail().getValue(),
            passwordHash: user.getPasswordHash()?.getValue() ?? null,
            googleId: user.getGoogleId() ?? null,
        };
        await this.userModel.updateOne({ _id: id }, { $set: data }, { upsert: true });
    }
    async findById(id) {
        const document = await this.userModel.findById(id.getValue()).exec();
        if (!document)
            return null;
        return this.mapToDomain(document);
    }
    async findByEmail(email) {
        const document = await this.userModel
            .findOne({ email: email.getValue() })
            .exec();
        if (!document)
            return null;
        return this.mapToDomain(document);
    }
    async findByGoogleId(googleId) {
        const document = await this.userModel.findOne({ googleId }).exec();
        if (!document)
            return null;
        return this.mapToDomain(document);
    }
    mapToDomain(document) {
        return user_entity_1.User.create(new user_id_vo_1.UserId(document._id), new email_vo_1.Email(document.email), document.passwordHash ? new password_hash_vo_1.PasswordHash(document.passwordHash) : null, document.googleId);
    }
};
exports.MongooseUserRepository = MongooseUserRepository;
exports.MongooseUserRepository = MongooseUserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MongooseUserRepository);
//# sourceMappingURL=mongoose-user.repository.js.map