import {Application, Router} from "express";
import http from "http";
import {AddressInfo} from "net";
import logger from "../logger";
import EconomistResource from "../economistResource";
import StatusResource from "../statusResource";
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
        router.get("/status", new StatusResource().health);
        router.post("/articles", new EconomistResource().create);
        router.get("/articles", new EconomistResource().all);
        router.get("/articles/:articleId", new EconomistResource().byId);
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
