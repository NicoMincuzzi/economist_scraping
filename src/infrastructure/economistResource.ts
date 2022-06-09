import {NextFunction, Request, Response} from "express";
import {StatusCodes} from "http-status-codes";
import {Page} from "../domain/page";
import CreateArticle from "../usecase/createArticle";
import GetArticle from "../usecase/getArticle";
import ArticleDbRepository from "./articleDbRepository";
import EconomistNewsPaperAdapter from "./economistNewsPaperAdapter";

class EconomistResource {
    public async create(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const articleService = new CreateArticle(
                new ArticleDbRepository(),
                new Page(new EconomistNewsPaperAdapter()),
            );
            const ids = await articleService.createAndRetrieveAll();
            response.status(StatusCodes.CREATED)
                .set("Content-Type", "usecase/json; charset=utf-8")
                .send(JSON.stringify(ids));
        } catch (err) {
            next(err);
        }
    }

    public async all(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const articleService = new GetArticle(new ArticleDbRepository());
            const economistArticles = await articleService.retrieveAll();
            response.status(StatusCodes.OK)
                .set("Content-Type", "usecase/json; charset=utf-8")
                .send(JSON.stringify(economistArticles));
        } catch (err) {
            next(err);
        }
    }

    public async byId(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const articleService = new GetArticle(new ArticleDbRepository());
            const economistArticle = await articleService.retrieveById(request.params.articleId);
            response.status(StatusCodes.OK)
                .set("Content-Type", "usecase/json; charset=utf-8")
                .send(JSON.stringify(economistArticle));
        } catch (err) {
            next(err);
        }
    }
}

export default EconomistResource;
