import express from "express";
import Server from "../../src/infrastructure/server/server";

class WebServer {
    public static appInstance: express.Application;

    public static async run(): Promise<express.Application> {
        if (this.appInstance) {
            return this.appInstance;
        }
        this.appInstance = express();
        const server = new Server(this.appInstance);
        await server.init();
        return this.appInstance;
    }
}

export default WebServer;
