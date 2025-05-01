import { Application } from "express";
import entryRoutes from "./entry.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api/entries", entryRoutes);
  }
}
