import {Application, NextFunction, Request, Response, Router} from "express";
import {StatusCodes} from "http-status-codes";
import EconomistHomepage from "../adapter/economistHomepage";
import ArticleService from "../core/articleService";
import EconomistParser from "../core/economistParser";

class Article {

    private static all(request: Request, response: Response, next: NextFunction): void {
        try {
            const articleService = new ArticleService(new EconomistHomepage(), new EconomistParser());
            const economistArticles = articleService.retrieveAll();
            response.status(StatusCodes.OK)
                .set("Content-Type", "application/json; charset=utf-8")
                .send(JSON.stringify(economistArticles));
        } catch (err) {
            next(err);
        }
    }

    private readonly router: Router;
    private readonly express: Application;

    constructor(express: Application) {
        this.router = Router();
        this.express = express;
    }

    public register(): void {
        this.express.use("/api/v1", this.router);
        this.router.get("/articles", Article.all);
    }
}

export default Article;
