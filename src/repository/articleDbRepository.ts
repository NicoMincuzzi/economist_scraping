import Article, {IArticle} from "../model/article.schema";
import {Economist} from "../model/economist";
import {IRepository} from "./repository";

class ArticleDbRepository implements IRepository {
    public persist(newsItem: Economist): void {
        const article = newsItem.to();
        article.save();
    }

    public persistAll(newsItems: Economist[]): void {
        newsItems.forEach((newsItem) => {
            this.persist(newsItem);
        });
    }

    public async readAll(): Promise<IArticle[]> {
        return await Article.find();
    }

    public async readById(articleId: string): Promise<IArticle> {
        return await Article.findOne({articleId: `${articleId}`});
    }
}

export default ArticleDbRepository;
