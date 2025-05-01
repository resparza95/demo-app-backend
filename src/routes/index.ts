import { Application } from "express";
import entryRoutes from "./entry.routes";
import homeRoutes from "./home.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api", homeRoutes);
    app.use("/api/entries", entryRoutes);
  }
}
