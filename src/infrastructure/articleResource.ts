import {NextFunction, Request, Response} from "express";
import {StatusCodes} from "http-status-codes";
import {Page} from "../domain/page";
import RetrieveArticle from "../usecase/retrieveArticle";
import ShowArticleTitleAndSubtitle from "../usecase/showArticleTitleAndSubtitle";
import EconomistNewsPaperAdapter from "./adapter/economistNewsPaperAdapter";
import ArticleDbRepository from "./articleDbRepository";

class ArticleResource {
    public async retrieve(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const articleService = new RetrieveArticle(
                new ArticleDbRepository(),
                new Page(new EconomistNewsPaperAdapter()),
            );
            const ids = await articleService.all();
            response.status(StatusCodes.CREATED)
                .set("Content-Type", "application/json; charset=utf-8")
                .send(JSON.stringify(ids));
        } catch (err) {
            next(err);
        }
    }

    public async showAll(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const articleService = new ShowArticleTitleAndSubtitle(new ArticleDbRepository());
            const economistArticles = await articleService.all();
            response.status(StatusCodes.OK)
                .set("Content-Type", "application/json; charset=utf-8")
                .send(JSON.stringify(economistArticles));
        } catch (err) {
            next(err);
        }
    }

    public async showById(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const articleService = new ShowArticleTitleAndSubtitle(new ArticleDbRepository());
            const economistArticle = await articleService.byId(request.params.articleId);
            response.status(StatusCodes.OK)
                .set("Content-Type", "application/json; charset=utf-8")
                .send(JSON.stringify(economistArticle));
        } catch (err) {
            next(err);
        }
    }
}

export default ArticleResource;
