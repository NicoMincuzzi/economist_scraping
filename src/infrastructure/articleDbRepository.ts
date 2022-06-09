import logger from "./logger";
import {Economist} from "../domain/economist";
import NotFoundError from "../domain/notFoundError";
import ArticleEntity, {IArticle} from "../domain/repository/article.schema";
import {IArticleRepository} from "../domain/repository/articleRepository";

class EconomistDbRepository implements IArticleRepository {
    public persist(newsItem: Economist): void {
        const article = newsItem.to();
        article.save();
    }

    public persistAll(newsItems: Economist[]): void {
        try {
            newsItems.forEach((newsItem) => {
                this.persist(newsItem);
            });
        } catch (err) {
            logger.error(err);
        }
    }

    public async readAll(): Promise<IArticle[]> {
        return await ArticleEntity.find();
    }

    public async readById(articleId: string): Promise<IArticle> {
        const article = await ArticleEntity.findOne({articleId: `${articleId}`});
        if (article === null) {
            throw new NotFoundError();
        }
        return article;
    }
}

export default EconomistDbRepository;
