import NotFoundError from "../exception/notFoundError";
import logger from "../logger";
import Article, {IArticle} from "../model/article.schema";
import {Economist} from "../model/economist";
import {IRepository} from "./repository";

class EconomistDbRepository implements IRepository {
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
        return await Article.find();
    }

    public async readById(articleId: string): Promise<IArticle> {
        const article = await Article.findOne({articleId: `${articleId}`});
        if (article === null) {
            throw new NotFoundError();
        }
        return article;
    }
}

export default EconomistDbRepository;
