import express from "express";
import * as http from "http";
import addErrorHandler from "./errorHandler";
import registerRoutes from "./routes";

export default class App {

    private static basePathRoute(request: express.Request, response: express.Response): void {
        response.set("Content-Type", "application/json; charset=utf-8").json({message: "base path"});
    }

    public express: express.Application;

    public httpServer: http.Server;

    public async init(): Promise<void> {
        this.express = express();
        this.httpServer = http.createServer(this.express);
        this.routes();
        this.addErrorHandler();
    }

    private routes(): void {
        this.express.get("/", App.basePathRoute);
        registerRoutes(this.express);
    }

    private addErrorHandler(): void {
        this.express.use(addErrorHandler);
    }
}
