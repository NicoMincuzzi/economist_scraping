import {Economist} from "../model/economist";

export interface IArticleService {
    retrieveById(articleId: string): Promise<Economist>;

    retrieveAll(): Promise<Economist[]>;

    createAndRetrieveAll(): Promise<string[]>;
}
