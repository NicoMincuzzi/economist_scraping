import "jest";
import Economist from "../../src/adapter/economist";
import {IPage} from "../../src/adapter/ipage";

describe("external provider integration tests", () => {

    it("check get request to economist website", async () => {
        const page: IPage = new Economist();
        const result = await page.retrieve();
        expect(result).toContain("<!DOCTYPE html>");
    });

});
