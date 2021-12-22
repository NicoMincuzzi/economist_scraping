import {mock} from "jest-mock-extended";
import {IPage} from "../../src/adapter/page";
import ArticleService from "../../src/core/articleService";
import {IParser} from "../../src/core/parser";
import {Economist} from "../../src/model/economist";
import Article from "../../src/repository/article.schema";
import {IRepository} from "../../src/repository/repository";

describe("article service", () => {

    it("check retrieve a single article by identifier and create a representation", () => {
        const articleSchema = Promise.resolve(new Article({
            articleId: "articleId",
            subtitle: "subtitle",
            title: "Title",
        }));

        const repository = mock<IRepository>();
        const page = mock<IPage>();
        const parser = mock<IParser>();
        repository.readById.calledWith("articleId").mockReturnValue(articleSchema);

        new ArticleService(repository, page, parser).retrieveById("articleId").then((result) => {
            expect(result.getTitle).toEqual(new Economist("ignore", "Title", "subtitle").getTitle);
            expect(result.getSubtitle).toEqual(new Economist("ignore", "Title", "subtitle").getSubtitle);
        });
    });
});
