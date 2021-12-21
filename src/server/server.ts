import {Application, Router} from "express";
import http from "http";
import {AddressInfo} from "net";
import ArticleController from "../controller/articleController";
import Status from "../controller/status";
import logger from "../logger";
import addErrorHandler from "./errorHandler";

const PORT = process.env.PORT || 3000;

export default class Server {
    private readonly app: Application;
    private readonly httpServer: http.Server;

    constructor(app: Application) {
        this.app = app;
        this.httpServer = http.createServer(this.app);
    }

    public async init(): Promise<http.Server> {
        this.app.set("port", PORT);

        this.routes();
        this.app.use(addErrorHandler);
        return this.httpServer;
    }

    private routes(): void {
        const router = Router();

        this.app.use("/api/v1", router);
        router.get("/status", new Status().getSystemInfo);
        router.get("/articles", new ArticleController().all);
        router.get("/articles/:articleId", new ArticleController().byId);
    }
}

export function serverError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== "listen") {
        throw error;
    }
    throw error;
}

export function serverListening(address, port): void {
    const addressInfo: AddressInfo = address as AddressInfo;
    logger.info(`Listening on ${addressInfo.address}:${port}`);
}
