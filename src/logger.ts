import {existsSync, mkdirSync} from "fs";
import winston, {format, Logger} from "winston";

const {combine, splat, timestamp, printf, align} = format;

if (!existsSync("./logs")) {
    mkdirSync("./logs");
}

const logger: Logger = winston.createLogger({
    format: combine(
        format.colorize(),
        splat(),
        timestamp(),
        align(),
        printf((info) => `[${info.level}]: ${info.message} `),
    ),
    level: "info",
    transports: [
        new winston.transports.File({filename: `./logs/error.log`, level: "error"}),
        new winston.transports.File({filename: `./logs/combined.log`}),
    ],
});

if (process.env.NODE_ENV !== "production") {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

export default logger;
