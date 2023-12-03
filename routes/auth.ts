import { Router } from "express";
import {
  loginController,
  registerController,
  verifyUser,
} from "../controllers/authControllers";
import { check } from "express-validator";
import { EmailExist } from "../helpers/validations";
import { collectErrors } from "../middlewares/collectErrors";

const router = Router();

router.post(
  "/register",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("surname", "El apellido es obligatorio").not().isEmpty(),
    check("phone", "El numero celular es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    check("password", "La contraseña debe tener minimo 6 caracteres").isLength({
      min: 6,
    }),
    check("email").custom(EmailExist),
    collectErrors,
  ],
  registerController
);
router.post(
  "/login",
  [
    check("email", "El mail es obligatorio").not().isEmpty(),
    check("email", "El mail no es valido").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    check("password", "La contraseña debe tener minimo 6 caracteres").isLength({
      min: 6,
    }),
    collectErrors,
  ],
  loginController
);

router.patch(
  "/verify",
  [
    check("email", "El mail es obligatorio").not().isEmpty(),
    check("email", "El mail no es valido").isEmail(),
    check("code").not().isEmpty(),
    collectErrors,
  ],
  verifyUser
);

export default router;
