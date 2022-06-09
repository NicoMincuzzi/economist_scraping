import {mock} from "jest-mock-extended";
import RetrieveArticle from "../../src/usecase/retrieveArticle";
import {Page} from "../../src/domain/page";
import {IArticleRepository} from "../../src/domain/repository/articleRepository";
import {Article} from "../../src/domain/article";

describe("Retrieve info about article in Article website", () => {

    it("retrieve info about all articles", async () => {
        const repository = mock<IArticleRepository>();
        const page = mock<Page>();
        repository.persistAll([new Article("123", "Title", "subtitle")]);
        page.parser.mockResolvedValue([new Article("ignore", "Title", "subtitle")]);

        await new RetrieveArticle(repository, page).all().then((result) => {
            expect(result.length).toEqual(1);
        });
    });
});
