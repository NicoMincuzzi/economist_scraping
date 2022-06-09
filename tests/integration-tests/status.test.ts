import express from "express";
import {StatusCodes} from "http-status-codes";
import "jest";
import request from "supertest";
import WebServer from "./webServer";

describe("status endpoints integration tests", () => {
    let app: express.Application;

    beforeAll(async () => {
        app = await WebServer.run();
    });

    it("verify health check /status endpoint", async () => {
        await request(app)
            .get("/api/v1/status")
            .set("Accept", "usecase/json")
            .expect(StatusCodes.OK);
    });
});
