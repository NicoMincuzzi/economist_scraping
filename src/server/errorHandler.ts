import {NextFunction, Request, Response} from "express";
import {INTERNAL_SERVER_ERROR} from "http-status-codes";
import ApiError from "./apiError";

const addErrorHandler = (error: ApiError, request: Request, response: Response, next: NextFunction): void => {
    if (error) {
        const status: number = error.status || INTERNAL_SERVER_ERROR;
        const body: any = {
            fields: error.fields,
            message: error.message || "An error occurred during the request.",
            name: error.name,
        };

        response.status(status).json(JSON.stringify(body));
    }
    next();
};

export default addErrorHandler;
