"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authControllers_1 = require("../controllers/authControllers");
const express_validator_1 = require("express-validator");
const validations_1 = require("../helpers/validations");
const collectErrors_1 = require("../middlewares/collectErrors");
const router = (0, express_1.Router)();
router.get("/", () => { console.log("hola"); });
router.post("/register", [
    (0, express_validator_1.check)("name", "El nombre es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("surname", "El apellido es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("phone", "El numero celular es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("email", "El email es obligatorio").isEmail(),
    (0, express_validator_1.check)("password", "La contraseña es obligatoria").not().isEmpty(),
    (0, express_validator_1.check)("password", "La contraseña debe tener minimo 6 caracteres").isLength({
        min: 6,
    }),
    (0, express_validator_1.check)("email").custom(validations_1.EmailExist),
    collectErrors_1.collectErrors,
], authControllers_1.registerController);
router.post("/login", [
    (0, express_validator_1.check)("email", "El mail es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("email", "El mail no es valido").isEmail(),
    (0, express_validator_1.check)("password", "La contraseña es obligatoria").not().isEmpty(),
    (0, express_validator_1.check)("password", "La contraseña debe tener minimo 6 caracteres").isLength({
        min: 6,
    }),
    collectErrors_1.collectErrors,
], authControllers_1.loginController);
router.patch("/verify", [], authControllers_1.verifyUser);
exports.default = router;
