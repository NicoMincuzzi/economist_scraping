import {Economist} from "../economist";
import {IArticle} from "./article.schema";

export interface IArticleRepository {
    persist(newsItem: Economist): void;

    persistAll(newsItems: Economist[]): void;

    readById(id: string): Promise<IArticle>;

    readAll(): Promise<IArticle[]>;
}
