import {StatusCodes} from "http-status-codes";
import logger from "../infrastructure/logger";
import NotFoundError from "../domain/notFoundError";
import {IArticleRepository} from "../domain/repository/articleRepository";
import ApiError from "../infrastructure/server/apiError";
import {Economist} from "../domain/economist";

class GetArticle {
    private repository: IArticleRepository;

    constructor(repository: IArticleRepository) {
        this.repository = repository;
    }

    public async retrieveAll(): Promise<Economist[]> {
        try {
            const articles = await this.repository.readAll();
            return articles.map((article) => {
                return Economist.from(article);
            });
        } catch (e) {
            logger.error(e);
            throw new ApiError();
        }
    }

    public async retrieveById(articleId: string): Promise<Economist> {
        try {
            logger.info("Read article with id: %s", articleId);
            const article = await this.repository.readById(articleId);
            return new Economist(article.articleId, article.title, article.subtitle);
        } catch (e) {
            if (e instanceof NotFoundError) {
                logger.warn("Item not found with Id: %s", articleId);
                throw new ApiError("Item not found.", StatusCodes.NOT_FOUND, "NOT_FOUND");
            }
            logger.error(e);
            throw new ApiError();
        }
    }
}

export default GetArticle;
