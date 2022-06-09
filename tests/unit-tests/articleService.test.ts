import {mock} from "jest-mock-extended";
import {INewsPaperAdapter} from "../../src/domain/newsPaperAdapter";
import ShowArticleTitleAndSubtitle from "../../src/usecase/showArticleTitleAndSubtitle";
import ArticleEntity from "../../src/domain/repository/article.schema";
import {IArticleRepository} from "../../src/domain/repository/articleRepository";
import {Article} from "../../src/domain/article";

describe("article service", () => {

    it("check retrieve a single article by identifier and create a representation", () => {
        const articleSchema = Promise.resolve(new ArticleEntity({
            articleId: "articleId",
            subtitle: "subtitle",
            title: "Title",
        }));

        const repository = mock<IArticleRepository>();
        const page = mock<INewsPaperAdapter>();
        repository.readById.calledWith("articleId").mockReturnValue(articleSchema);

        new ShowArticleTitleAndSubtitle(repository).byId("articleId").then((result) => {
            expect(result.getTitle).toEqual(new Article("ignore", "Title", "subtitle").getTitle);
            expect(result.getSubtitle).toEqual(new Article("ignore", "Title", "subtitle").getSubtitle);
        });
    });

    it("check retrieve all articles in a collection and create a representation", () => {
        const articleSchema = Promise.resolve([new ArticleEntity({
            articleId: "articleId",
            subtitle: "subtitle",
            title: "Title",
        })]);

        const repository = mock<IArticleRepository>();
        const page = mock<INewsPaperAdapter>();
        repository.readAll.mockReturnValue(articleSchema);

        new ShowArticleTitleAndSubtitle(repository).all().then((result) => {
            expect(result[0].getTitle).toEqual(new Article("ignore", "Title", "subtitle").getTitle);
            expect(result[0].getSubtitle).toEqual(new Article("ignore", "Title", "subtitle").getSubtitle);
        });
    });
});
