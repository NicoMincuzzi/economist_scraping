import {StatusCodes} from "http-status-codes";
import {Article} from "../domain/article";
import NotFoundError from "../domain/notFoundError";
import {IArticleRepository} from "../domain/repository/articleRepository";
import logger from "../infrastructure/configuration/logger";
import ApiError from "../infrastructure/server/apiError";

class ShowArticleTitleAndSubtitle {
    private repository: IArticleRepository;

    constructor(repository: IArticleRepository) {
        this.repository = repository;
    }

    public async all(): Promise<Article[]> {
        try {
            const articles = await this.repository.readAll();
            return articles.map((article) => {
                return Article.from(article);
            });
        } catch (e) {
            logger.error(e);
            throw new ApiError();
        }
    }

    public async byId(articleId: string): Promise<Article> {
        try {
            logger.info("Read article with id: %s", articleId);
            const article = await this.repository.readById(articleId);
            return new Article(article.articleId, article.title, article.subtitle);
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

export default ShowArticleTitleAndSubtitle;
