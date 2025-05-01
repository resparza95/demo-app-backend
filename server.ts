import express, { Application } from "express";
import Server from "./src/index";
import sequelize from './src/config/db.config';

const app: Application = express();
const server: Server = new Server(app);
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;

app
  .listen(PORT, "localhost", function () {
    console.log(`Server is running on port ${PORT}.`);
  })
  .on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.log("Error: address already in use");
    } else {
      console.log(err);
    }
  });

  sequelize
    .sync()
    .then(() => {
      console.log('Database synced successfully.');
      app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.error('Error syncing database:', error);
    });
