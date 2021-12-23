import express from "express";
import "jest";
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
});
