import "jest";
import EconomistHomepage from "../../src/adapter/economistHomepage";
import {IPage} from "../../src/adapter/ipage";

describe("external provider integration tests", () => {

    it("check get request to economist website", async () => {
        const page: IPage = new EconomistHomepage();
        const result = await page.retrieve();
        expect(result).toContain("<!DOCTYPE html>");
    });

});
