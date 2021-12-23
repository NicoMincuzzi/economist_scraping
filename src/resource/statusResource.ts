import {NextFunction, Request, Response} from "express";
import {StatusCodes} from "http-status-codes";

export default class StatusResource {
    public health(req: Request, res: Response, next: NextFunction): void {
        try {
            res.locals.data = {
                code: "SUCCESS",
                message: "Healthy",
            };
            res.status(StatusCodes.OK)
                .set("Content-Type", "application/json; charset=utf-8")
                .send(JSON.stringify(res.locals.data));
        } catch (err) {
            next(err);
        }
    }
}
