import express from "express";
import App from "../../src/App";

class WebServer {
    public static appInstance: express.Application;

    public static async run(): Promise<express.Application> {
        if (this.appInstance) {
            return this.appInstance;
        }
        const app = new App();
        await app.init();
        this.appInstance = app.express;
        return this.appInstance;
    }
}

export default WebServer;
