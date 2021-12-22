import {Economist} from "../model/economist";
import {IArticle} from "../model/article.schema";

export interface IRepository {
    persist(newsItem: Economist): void;

    persistAll(newsItems: Economist[]): void;

    readById(id: string): Promise<IArticle>;

    readAll(): Promise<IArticle[]>;
}
