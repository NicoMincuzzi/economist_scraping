import {Economist} from "../model/economist";
import {IRepository} from "./repository";

class ArticleDbRepository implements IRepository {
    public create(newsItem: Economist): void {
        const article = newsItem.to();
        article.save();
    }

    public creatAll(newsItems: Economist[]): void {
        newsItems.forEach((newsItem) => {
            this.create(newsItem);
        });
    }
}

export default ArticleDbRepository;
