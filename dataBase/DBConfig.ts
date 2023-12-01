import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {

    const url = process.env.DB_URL;

    if(!url){
      throw new Error ("La URL de la base de datos no esta ingresada correctamente.")
    }
    await mongoose.connect(url);
    console.log("BD - MOKSHA ONLINE");
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de iniciar la base de datos.");
  }
};
