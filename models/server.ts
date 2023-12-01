import express, { Express } from "express";
import { connectDB } from "../dataBase/DBConfig";
import authRouter from "../routes/auth";

export class Server {
  app: Express;
  port: string | number | undefined;
  authPath : string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.authPath = "/auth";

    this.conectionBD();
    this.middlewares();
    this.routes();
  }

  async conectionBD(): Promise<void> {
    await connectDB();
  }

  middlewares() {
    this.app.use(express.json());
  }

  routes() : void {
    this.app.use(this.authPath,authRouter)
  }

  listen(): void {
    this.app.listen(this.port, () => {
      console.log(`API MOKSHA - PORT : ${this.port}`);
    });
  }
}
