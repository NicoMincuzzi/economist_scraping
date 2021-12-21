import {Economist} from "../model/economist";

export interface IRepository {
    create(newsItem: Economist): void;

    creatAll(newsItems: Economist[]): void;
}
