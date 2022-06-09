import {Article} from "../article";
import {IArticle} from "./article.schema";

export interface IArticleRepository {
    persist(newsItem: Article): void;

    persistAll(newsItems: Article[]): void;

    readById(id: string): Promise<IArticle>;

    readAll(): Promise<IArticle[]>;
}
