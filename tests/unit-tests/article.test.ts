import {mock} from "jest-mock-extended";
import {IPage} from "../../src/adapter/page";
import ArticleService from "../../src/core/articleService";
import {IParser} from "../../src/core/parser";
import {Economist} from "../../src/model/economist";
import {IRepository} from "../../src/repository/repository";

describe("Retrieve info about article in Economist website", () => {

    it("retrieve info about all Economist articles", async () => {
        const repository = mock<IRepository>();
        const page = mock<IPage>();
        const parser = mock<IParser>();
        const htmlDom = `<main id="content"><div class=\"e1yv2jhn0\"><h3 class=\"css-cxz0do ef0oilz0\"><a>Title</a></h3><p class=\"e1smrlcj0\">subtitle</p></div></main>`;
        repository.persistAll([new Economist("123", "Title", "subtitle")]);
        page.retrieve.mockReturnValue(htmlDom);
        parser.run.calledWith(htmlDom).mockReturnValue([new Economist("ignore", "Title", "subtitle")]);

        await new ArticleService(repository, page, parser).createAndRetrieveAll().then((result) => {
            expect(result.length).toEqual(1);
        });
    });
});
