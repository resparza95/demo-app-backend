import express, { Application } from "express";
import cors, { CorsOptions } from "cors";
import Routes from "./routes";
import sequelize from './config/db.config';

export default class Server {
  constructor(app: Application) {
    this.config(app);
    new Routes(app);
  }

  private config(app: Application): void {
    const port = 3000;
    const corsOptions: CorsOptions = {
      origin: "http://localhost:8081"
    };

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    sequelize
    .sync()
    .then(() => {
      console.log('Database synced successfully.');
      app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
      });
    })
    .catch((error) => {
      console.error('Error syncing database:', error);
    });
  }

}
