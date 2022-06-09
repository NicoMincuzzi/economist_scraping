import express from "express";
import "jest";
import EconomistNewsPaperAdapter from "../../src/infrastructure/economistNewsPaperAdapter";
import {INewsPaperAdapter} from "../../src/infrastructure/newsPaperAdapter";
import WebServer from "./webServer";

describe("external provider integration tests", () => {
    let app: express.Application;

    beforeAll(async () => {
        app = await WebServer.run();
    });

    it("check get request to economist website", async () => {
        const page: INewsPaperAdapter = new EconomistNewsPaperAdapter();
        const result = await page.get();
        expect(result).toContain("<!DOCTYPE html>");
    });
});
