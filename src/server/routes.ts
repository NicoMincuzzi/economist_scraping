import * as express from "express";
import Article from "../controller/article";
import Status from "../controller/status";

export default function registerRoutes(app: express.Application): void {
    new Status(app).register();
    new Article(app).register();
}
