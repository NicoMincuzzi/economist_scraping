import express, {Express} from "express";
import Server, {serverError, serverListening} from "./server/server";

const PORT = process.env.PORT || 3000;

const app: Express = express();

const server = new Server(app);
server.init().then((httpServer) => {
    httpServer.on("error", serverError);
    httpServer.on("listening", () => {
        serverListening(httpServer.address(), PORT);
    });
    httpServer.listen(PORT);
});
