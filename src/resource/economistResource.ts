import {NextFunction, Request, Response} from "express";
import {StatusCodes} from "http-status-codes";
import EconomistHomepage from "../adapter/economistHomepage";
import EconomistParser from "../core/economistParser";
import EconomistService from "../core/economistService";
import EconomistDbRepository from "../repository/economistDbRepository";

class EconomistResource {
    public async create(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const articleService = new EconomistService(new EconomistDbRepository(),
                new EconomistHomepage(),
                new EconomistParser());
            const ids = await articleService.createAndRetrieveAll();
            response.status(StatusCodes.CREATED)
                .set("Content-Type", "application/json; charset=utf-8")
                .send(JSON.stringify(ids));
        } catch (err) {
            next(err);
        }
    }

    public async all(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const articleService = new EconomistService(new EconomistDbRepository(),
                new EconomistHomepage(),
                new EconomistParser());
            const economistArticles = await articleService.retrieveAll();
            response.status(StatusCodes.OK)
                .set("Content-Type", "application/json; charset=utf-8")
                .send(JSON.stringify(economistArticles));
        } catch (err) {
            next(err);
        }
    }

    public async byId(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const articleService = new EconomistService(new EconomistDbRepository(),
                new EconomistHomepage(),
                new EconomistParser());
            const economistArticle = await articleService.retrieveById(request.params.articleId);
            response.status(StatusCodes.OK)
                .set("Content-Type", "application/json; charset=utf-8")
                .send(JSON.stringify(economistArticle));
        } catch (err) {
            next(err);
        }
    }
}

export default EconomistResource;
