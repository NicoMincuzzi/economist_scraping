import {Article} from "../domain/article";
import NotFoundError from "../domain/notFoundError";
import ArticleEntity, {IArticle} from "../domain/repository/article.schema";
import {IArticleRepository} from "../domain/repository/articleRepository";
import logger from "./configuration/logger";

class EconomistDbRepository implements IArticleRepository {
    public persist(newsItem: Article): void {
        const article = newsItem.to();
        article.save();
    }

    public persistAll(newsItems: Article[]): void {
        try {
            newsItems.forEach((newsItem) => {
                this.persist(newsItem);
            });
        } catch (err) {
            logger.error(err);
        }
    }

    public async readAll(): Promise<IArticle[]> {
        return ArticleEntity.find();
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
