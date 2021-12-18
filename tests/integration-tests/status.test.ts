import express from "express";
import {StatusCodes} from "http-status-codes";
import "jest";
import request from "supertest";
import WebServer from "./web-server";

describe("status endpoints integration tests", () => {
    let app: express.Application;

    beforeAll(async () => {
        app = await WebServer.run();
    });

    it("check base path", async () => {
        await request(app)
            .get("/api/status/system")
            .set("Accept", "application/json")
            .expect("Content-Type", "application/json; charset=utf-8")
            .expect(StatusCodes.OK);
    });

    it("retrieve system info by /system endpoint", async () => {
        await request(app)
            .get("/api/status/system")
            .set("Accept", "application/json")
            .expect(StatusCodes.OK);
    });
});
