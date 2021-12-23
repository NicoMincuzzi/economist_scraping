import {StatusCodes} from "http-status-codes";
import {IPage} from "../adapter/page";
import logger from "../logger";
import {Economist} from "../model/economist";
import {IRepository} from "../repository/repository";
import ApiError from "../server/apiError";
import {IParser} from "./parser";

class ArticleService {
    private repository: IRepository;
    private page: IPage;
    private parser: IParser;

    constructor(repository: IRepository, page: IPage, parser: IParser) {
        this.repository = repository;
        this.page = page;
        this.parser = parser;
    }

    public async createAndRetrieveAll(): Promise<string[]> {
        const htmlDom = await this.page.retrieve();
        const newsItems: Economist[] = this.parser.run(htmlDom);
        this.repository.persistAll(newsItems);
        return newsItems.map((newItem) => {
            return newItem.getId;
        });
    }

    public retrieveAll(): Promise<Economist[]> {
        return this.repository.readAll().then((articles) => {
            return articles.map((article) => {
                return Economist.from(article);
            });
        });
    }

    public retrieveById(articleId: string): Promise<Economist> {
        return this.repository.readById(articleId).then((article) => {
            logger.info("Read Article by Id: %s", articleId);
            if (article === null) {
                logger.warn("Item not found with Id: %s", articleId);
                throw new ApiError("Item not found.", StatusCodes.NOT_FOUND, "NOT_FOUND");
            }
            return new Economist(article.articleId, article.title, article.subtitle);
        });
    }
}

export default ArticleService;
