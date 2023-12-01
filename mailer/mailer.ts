import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mg41521048@gmail.com",
    pass: "kixsmvgjrksgulex",
  },
  tls: {
    rejectUnauthorized: false,
  },
  from: "mg41521048@gmail.com",
});

export const sendEmail = async (to: string, code: string): Promise<void> => {
  const mailOptions = {
    from: '"MOKSHA - Codigo" mg41521048@gmail.com',
    to,
    subject: "Código de verificación para MOKSHA",
    text: `
            Llegó tu codigo para moksha.
            El código es ${code}, ingresalo en la campo correspondiente.
        `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Correo enviado con exito.");
  } catch (error) {
    console.error("Error al enviar el correo electrónico:", error);
  }
};
