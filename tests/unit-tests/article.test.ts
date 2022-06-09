import {mock} from "jest-mock-extended";
import CreateArticle from "../../src/usecase/createArticle";
import {Page} from "../../src/domain/page";
import {IArticleRepository} from "../../src/domain/repository/articleRepository";
import {Economist} from "../../src/domain/economist";

describe("Retrieve info about article in Article website", () => {

    it("retrieve info about all articles", async () => {
        const repository = mock<IArticleRepository>();
        const page = mock<Page>();
        repository.persistAll([new Economist("123", "Title", "subtitle")]);
        page.parser.mockResolvedValue([new Economist("ignore", "Title", "subtitle")]);

        await new CreateArticle(repository, page).createAndRetrieveAll().then((result) => {
            expect(result.length).toEqual(1);
        });
    });
});
