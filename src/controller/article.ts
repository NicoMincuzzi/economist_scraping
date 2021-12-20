import {NextFunction, Request, Response} from "express";
import {StatusCodes} from "http-status-codes";
import EconomistHomepage from "../adapter/economistHomepage";
import ArticleService from "../core/articleService";
import EconomistParser from "../core/economistParser";

class Article {

    public all(request: Request, response: Response, next: NextFunction): void {
        try {
            const articleService = new ArticleService(new EconomistHomepage(), new EconomistParser());
            articleService.retrieveAll().then((economistArticles) => {
                response.status(StatusCodes.OK)
                    .set("Content-Type", "application/json; charset=utf-8")
                    .send(JSON.stringify(economistArticles));
            });
        } catch (err) {
            next(err);
        }
    }

    public byId(request: Request, response: Response, next: NextFunction): void {
        try {
            const articleService = new ArticleService(new EconomistHomepage(), new EconomistParser());
            articleService.retrieveById(request.params.articleId).then((economistArticle) => {
                response.status(StatusCodes.OK)
                    .set("Content-Type", "application/json; charset=utf-8")
                    .send(JSON.stringify(economistArticle));
            });
        } catch (err) {
            next(err);
        }
    }
}

export default Article;
