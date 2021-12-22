import {mock} from "jest-mock-extended";
import {IPage} from "../../src/adapter/page";
import ArticleService from "../../src/core/articleService";
import {IParser} from "../../src/core/parser";
import Article from "../../src/model/article.schema";
import {Economist} from "../../src/model/economist";
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

    it("check retrieve all articles in a collection and create a representation", () => {
        const articleSchema = Promise.resolve([new Article({
            articleId: "articleId",
            subtitle: "subtitle",
            title: "Title",
        })]);

        const repository = mock<IRepository>();
        const page = mock<IPage>();
        const parser = mock<IParser>();
        repository.readAll.mockReturnValue(articleSchema);

        new ArticleService(repository, page, parser).retrieveAll().then((result) => {
            expect(result[0].getTitle).toEqual(new Economist("ignore", "Title", "subtitle").getTitle);
            expect(result[0].getSubtitle).toEqual(new Economist("ignore", "Title", "subtitle").getSubtitle);
        });
    });
});
