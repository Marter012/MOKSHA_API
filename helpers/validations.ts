import { sendEmail } from "../mailer/mailer";
import Usuario, { IUser } from "../models/user";

export const EmailExist = async (email: string): Promise<void> => {
  const emailUser: IUser | null = await Usuario.findOne({ email });

  if (emailUser && emailUser?.verifiel) {
    throw new Error("El email ya esta registrado.");
  }

  if (emailUser) {
    await sendEmail(email, emailUser.code as string);
    throw new Error(
      "El usuario ya esta registrado, se envio nuevamente el codigo de verificacion."
    );
  }
};
