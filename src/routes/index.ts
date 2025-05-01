import { Application } from "express";
import entryRoutes from "./entry.routes";
import usageRoutes from "./usage.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api/entries", entryRoutes);
    app.use("/api/usage", usageRoutes);
  }
}
