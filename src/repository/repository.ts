import {IArticle} from "../model/article.schema";
import {Economist} from "../model/economist";

export interface IRepository {
    persist(newsItem: Economist): void;

    persistAll(newsItems: Economist[]): void;

    readById(id: string): Promise<IArticle>;

    readAll(): Promise<IArticle[]>;
}
