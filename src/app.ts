import express, {Express} from "express";
import MongoDatabase from "./adapter/database";
import Server, {serverError, serverListening} from "./server/server";

const PORT = process.env.PORT || 3000;
const db: string = "mongodb://admin:example@localhost:27017/economist";

const app: Express = express();

new MongoDatabase(db).init();

new Server(app).init().then((httpServer) => {
    httpServer.on("error", serverError);
    httpServer.on("listening", () => {
        serverListening(httpServer.address(), PORT);
    });

    httpServer.listen(PORT);
});
