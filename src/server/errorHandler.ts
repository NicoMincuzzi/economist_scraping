import {NextFunction, Request, Response} from "express";
import {INTERNAL_SERVER_ERROR} from "http-status-codes";
import ApiError from "./apiError";

const addErrorHandler = (error: ApiError, request: Request, response: Response, next: NextFunction): void => {
    if (error) {
        const status: number = error.getStatus || INTERNAL_SERVER_ERROR;
        const body: any = {
            fields: error.getFields,
            message: error.message || "An error occurred during the request.",
            name: error.name,
        };

        response.status(status).set("Content-Type", "application/json; charset=utf-8").json(body);
    }
    next();
};

export default addErrorHandler;
