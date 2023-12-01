"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailExist = void 0;
const mailer_1 = require("../mailer/mailer");
const user_1 = __importDefault(require("../models/user"));
const EmailExist = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const emailUser = yield user_1.default.findOne({ email });
    if (emailUser && (emailUser === null || emailUser === void 0 ? void 0 : emailUser.verifiel)) {
        throw new Error("El email ya esta registrado.");
    }
    if (emailUser) {
        yield (0, mailer_1.sendEmail)(email, emailUser.code);
        throw new Error("El usuario ya esta registrado, se envio nuevamente el codigo de verificacion.");
    }
});
exports.EmailExist = EmailExist;
