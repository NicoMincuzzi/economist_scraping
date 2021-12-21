import {NextFunction, Request, Response} from "express";
import {StatusCodes} from "http-status-codes";
import * as os from "os";
import * as process from "process";

export default class Status {
    public health(req: Request, res: Response, next: NextFunction): void {
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
}
