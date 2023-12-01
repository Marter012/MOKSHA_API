"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generarJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generarJWT = (id = "") => {
    return new Promise((res, rej) => {
        const payload = { id };
        jsonwebtoken_1.default.sign(payload, process.env.SECRETPASSWORD, {
            expiresIn: "2H",
        }, (err, token) => {
            if (err) {
                console.log(err);
                rej("No se pudo generar el JWT.");
            }
            else {
                res(token);
            }
        });
    });
};
exports.generarJWT = generarJWT;
