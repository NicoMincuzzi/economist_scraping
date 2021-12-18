import * as express from "express";
import Status from "./controller/status";

export default function registerRoutes(app: express.Application): void {
    new Status(app).register();
}
