import * as express from "express";
import {StatusCodes} from "http-status-codes";
import ApiError from "./apiError";

const addErrorHandler = (err: ApiError,
                         req: express.Request,
                         res: express.Response,
                         next: express.NextFunction,
): void => {
    if (err) {
        const status: number = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
        const body: any = {
            fields: err.fields,
            message: err.message || "An error occurred during the request.",
            name: err.name,
            stack: "",
            status,
        };

        res.status(status).json(JSON.stringify(body));
    }
    next();
};

export default addErrorHandler;
