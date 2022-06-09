import * as fs from "fs";
import {mock} from "jest-mock-extended";
import {INewsPaperAdapter} from "../../src/infrastructure/newsPaperAdapter";
import {Page} from "../../src/domain/page";
import {Economist} from "../../src/domain/economist";

describe("economist home page parser", () => {

    it("check retrieve title and subtitle from a single article", async () => {
        const dom = `<main role="main" id="content"><div class=\"e1yv2jhn0\"><p class=\"css-1129mxi eajo7ll0\">Leaders</p><h3 class=\"ef0oilz0\"><a>Title</a></h3><p class=\"e1smrlcj0\">subtitle</p></div></main>`;
        const page = mock<INewsPaperAdapter>();
        page.get.mockReturnValue(dom);

        const result = await new Page(page).parser();

        const expected = new Economist("ignore", "Title", "subtitle");
        expect(result[0].getTitle).toEqual(expected.getTitle);
        expect(result[0].getSubtitle).toEqual(expected.getSubtitle);
    });

    it("check retrieve info more articles", async () => {
        const dom = `<main id="content"><div class="e1yv2jhn0"><h3 class="css-g6fo13 ef0oilz0"><a>Title_1</a></h3><p class="e1smrlcj0">subtitle_1</p></div>
                     <div class=\"e1yv2jhn0\"><p class=\"eajo7ll0\">Leaders</p><h3 class=\"ef0oilz0\"><a>Title_2</a></h3><p class=\"e1smrlcj0\">subtitle_2</p></div></main>`;
        const page = mock<INewsPaperAdapter>();
        page.get.mockReturnValue(dom);

        const result = await new Page(page).parser();

        expect(result.length).toEqual(2);
    });

    it("check retrieve all articles", async () => {
        const dom = fs.readFileSync("./tests/resources/main.html", "utf8");
        const page = mock<INewsPaperAdapter>();
        page.get.mockReturnValue(dom);

        const result = await new Page(page).parser();

        expect(result.length).toEqual(3);
    });
});
