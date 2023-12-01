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
exports.verifyUser = exports.loginController = exports.registerController = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const randomstring_1 = __importDefault(require("randomstring"));
const mailer_1 = require("../mailer/mailer");
const generarJWT_1 = require("../helpers/generarJWT");
const registerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, surname, phone, email, password } = req.body;
    const user = new user_1.default({ name, surname, phone, email, password });
    const salt = bcryptjs_1.default.genSaltSync();
    user.password = bcryptjs_1.default.hashSync(password, salt);
    const newCode = randomstring_1.default.generate(6);
    user.code = newCode;
    yield user.save();
    yield (0, mailer_1.sendEmail)(email, newCode);
    res.status(201).json({
        user,
    });
});
exports.registerController = registerController;
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield user_1.default.findOne({ email });
        if (!user) {
            res.status(400).json({
                msg: "No hay email registrado.",
            });
            return;
        }
        const validatePassword = bcryptjs_1.default.compareSync(password, user.password);
        if (!validatePassword) {
            res.status(400).json({
                msg: "La contraseña es incorrecta.",
            });
            return;
        }
        const token = yield (0, generarJWT_1.generarJWT)(user.id);
        res.status(202).json({
            user,
            token,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error en el servidor.",
        });
    }
});
exports.loginController = loginController;
const verifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, code } = req.body;
    try {
        const user = yield user_1.default.findOne({ email });
        if (!user) {
            res.status(404).json({
                msg: "No se encontro el mail en la BD",
            });
            return;
        }
        if (user.verifiel) {
            res.status(400).json({
                msg: "El usuario ya esta correctamente verificado.",
            });
        }
        if (code !== user.code) {
            res.status(401).json({
                msg: "El codigo ingresado no es correcto",
            });
            return;
        }
        yield user_1.default.findOneAndUpdate({ email }, { verifiel: true });
        res.status(200).json({
            msg: "Usuario verificado con exito",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error en el servidor.",
        });
    }
});
exports.verifyUser = verifyUser;
