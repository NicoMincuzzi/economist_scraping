import {mock} from "jest-mock-extended";
import {IPage} from "../../src/adapter/page";
import ArticleService from "../../src/core/articleService";
import {IParser} from "../../src/core/parser";
import {Economist} from "../../src/model/economist";

describe("Retrieve info about article in Economist website", () => {

    it("retrieve info about all Economist articles", () => {
        const page = mock<IPage>();
        const parser = mock<IParser>();
        const htmlDom = `<main id="content"><div class=\"e1yv2jhn0\"><h3 class=\"css-cxz0do ef0oilz0\"><a>Title</a></h3><p class=\"e1smrlcj0\">subtitle</p></div></main>`;
        page.retrieve.mockReturnValue(htmlDom);
        parser.run.calledWith(htmlDom).mockReturnValue([new Economist("ignore", "Title", "subtitle")]);

        const result = new ArticleService(page, parser).retrieveAll();

        expect(result.length).toEqual(1);
        expect(result[0].getTitle).toEqual("Title");
        expect(result[0].getSubtitle).toEqual("subtitle");
    });
});
