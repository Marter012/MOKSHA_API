import { Request, Response } from "express";
import Usuario, { IUser } from "../models/user";
import bcryptjs from "bcryptjs";
import randomstring from "randomstring";
import { sendEmail } from "../mailer/mailer";
import { generarJWT } from "../helpers/generarJWT";

export const registerController = async (req: Request, res: Response) => {
  const { name, surname, phone, email, password }: IUser = req.body;

  const user = new Usuario({ name, surname, phone, email, password });

  const salt = bcryptjs.genSaltSync();

  user.password = bcryptjs.hashSync(password, salt);

  const newCode = randomstring.generate(6);

  user.code = newCode;

  await user.save();

  await sendEmail(email, newCode);

  res.status(201).json({
    user,
  });
};

export const loginController = async (req: Request, res: Response) => {
  const { email, password }: IUser = req.body;

  try {
    const user = await Usuario.findOne({ email });

    if (!user) {
      res.status(400).json({
        msg: "No hay email registrado.",
      });
      return;
    }

    const validatePassword = bcryptjs.compareSync(password, user.password);

    if (!validatePassword) {
      res.status(400).json({
        msg: "La contraseña es incorrecta.",
      });
      return;
    }

    const token = await generarJWT(user.id);

    res.status(202).json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor.",
    });
  }
};

export const verifyUser = async (req: Request, res: Response) => {
  const { email, code } = req.body;

  try {
    const user = await Usuario.findOne({ email });

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

    await Usuario.findOneAndUpdate({ email }, { verifiel: true });

    res.status(200).json({
      msg: "Usuario verificado con exito",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor.",
    });
  }
};
