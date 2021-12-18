import {Application, NextFunction, Request, Response, Router} from "express";
import {StatusCodes} from "http-status-codes";
import * as os from "os";
import * as process from "process";

export default class Status {

    private static getSystemInfo(req: Request, res: Response, next: NextFunction): void {
        try {
            res.locals.data = {
                cpus: os.cpus(),
                network: os.networkInterfaces(),
                os: {
                    platform: process.platform,
                    version: os.release(),
                },
            };
            res.status(StatusCodes.OK)
                .set("Content-Type", "application/json; charset=utf-8")
                .send(JSON.stringify(res.locals.data));
        } catch (err) {
            next(err);
        }
    }

    private readonly router: Router;
    private readonly express: Application;

    constructor(express: Application) {
        this.router = Router();
        this.express = express;
    }

    public register(): void {
        this.express.use("/api/status", this.router);
        this.router.get("/system", Status.getSystemInfo);
    }
}
