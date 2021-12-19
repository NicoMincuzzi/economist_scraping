import http from "http";
import {AddressInfo} from "net";
import App from "./App";

import logger from "./logger";

const port = process.env.PORT || 3000;

const app: App = new App();
let server: http.Server;

function serverError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== "listen") {
        throw error;
    }
    throw error;
}

function serverListening(): void {
    const addressInfo: AddressInfo = server.address() as AddressInfo;
    logger.info(`Listening on ${addressInfo.address}:${port}`);
}

app.init().then(() => {
    app.express.set("port", port);

    server = app.httpServer; // http.createServer(App);
    server.on("error", serverError);
    server.on("listening", serverListening);
    server.listen(port);
}).catch((err: Error) => {
    logger.error(err.name);
    logger.error(err.message);
    logger.error(err.stack);
});

process.on("unhandledRejection", (reason: Error) => {
    logger.error("Unhandled Promise Rejection: reason:", reason.message);
    logger.error(reason.stack);
    // application specific logging, throwing an error, or other logic here
});
