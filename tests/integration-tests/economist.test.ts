import "jest";
import EconomistHomepage from "../../src/adapter/economistHomepage";
import {Page} from "../../src/adapter/page";

describe("external provider integration tests", () => {

    it("check get request to economist website", async () => {
        const page: Page = new EconomistHomepage();
        const result = await page.retrieve();
        expect(result).toContain("<!DOCTYPE html>");
    });

});
