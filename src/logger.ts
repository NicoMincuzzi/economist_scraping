import {existsSync, mkdirSync} from "fs";
import {Logger} from "winston";
import winston = require("winston");

const logDir = "./logs";

if (!existsSync(logDir)) {
    mkdirSync(logDir);
}

const logger: Logger = winston.createLogger({
    format: winston.format.json(),
    level: "info",
    transports: [
        new winston.transports.File({filename: `${logDir}/error.log`, level: "error"}),
        new winston.transports.File({filename: `${logDir}/combined.log`}),
    ],
});

if (process.env.NODE_ENV !== "production") {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

export default logger;
