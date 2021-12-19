import express from "express";
import {StatusCodes} from "http-status-codes";
import "jest";
import request from "supertest";
import EconomistHomepage from "../../src/adapter/economistHomepage";
import {IPage} from "../../src/adapter/page";
import WebServer from "./webServer";

describe("external provider integration tests", () => {
    let app: express.Application;

    beforeAll(async () => {
        app = await WebServer.run();
    });

    it("check get request to economist website", async () => {
        const page: IPage = new EconomistHomepage();
        const result = await page.retrieve();
        expect(result).toContain("<!DOCTYPE html>");
    });

    it("retrieve articles resources by /articles endpoint", async () => {
        await request(app)
            .get("/api/v1/articles")
            .set("Accept", "application/json")
            .expect(StatusCodes.OK);
    });

});
