import express, {Express} from "express";
import * as mongoose from "mongoose";
import logger from "./infrastructure/logger";
import Server, {serverError, serverListening} from "./infrastructure/server/server";

const PORT = process.env.PORT || 3000;
const db: string = "mongodb://admin:example@" + process.env.MONGODB_HOST + ":27017/economist";

const app: Express = express();

mongoose.connect(db).then(() => {
    logger.info(`Successfully connected to ${db}`);

    new Server(app).init().then((httpServer) => {
        httpServer.on("error", serverError);
        httpServer.on("listening", () => {
            serverListening(httpServer.address(), PORT);
        });

        httpServer.listen(PORT);
    });
}).catch(
    (error) => {
        if (error) {
            logger.error(`Error connecting to database.`);
        }
    },
);
