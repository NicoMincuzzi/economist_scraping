import {StatusCodes} from "http-status-codes";
import {IPage} from "../adapter/page";
import ApiError from "../exception/apiError";
import NotFoundError from "../exception/notFoundError";
import logger from "../logger";
import {Economist} from "../model/economist";
import {IRepository} from "../repository/repository";
import {IArticleService} from "./articleService";
import {IParser} from "./parser";

class EconomistService implements IArticleService {
    private repository: IRepository;
    private page: IPage;
    private parser: IParser;

    constructor(repository: IRepository, page: IPage, parser: IParser) {
        this.repository = repository;
        this.page = page;
        this.parser = parser;
    }

    public async createAndRetrieveAll(): Promise<string[]> {
        try {
            logger.info("Retrieve HTML page of Economist.");
            const htmlDom = await this.page.retrieve();

            logger.info("Parser the HTML page of Economist.");
            const newsItems: Economist[] = this.parser.run(htmlDom);

            logger.info("Persist articles on db.");
            this.repository.persistAll(newsItems);
            return newsItems.map((newItem) => {
                return newItem.getId;
            });
        } catch (e) {
            logger.error(e);
            throw new ApiError();
        }
    }

    public async retrieveAll(): Promise<Economist[]> {
        try {
            const articles = await this.repository.readAll();
            logger.info("Read all Article.");
            return articles.map((article) => {
                return Economist.from(article);
            });
        } catch (e) {
            logger.error(e);
            throw new ApiError();
        }
    }

    public async retrieveById(articleId: string): Promise<Economist> {
        try {
            const article = await this.repository.readById(articleId);
            logger.info("Read Article by Id: %s", articleId);
            return new Economist(article.articleId, article.title, article.subtitle);
        } catch (e) {
            if (e instanceof NotFoundError) {
                logger.warn("Item not found with Id: %s", articleId);
                throw new ApiError("Item not found.", StatusCodes.NOT_FOUND, "NOT_FOUND");
            }
            logger.error(e);
            throw new ApiError();
        }
    }
}

export default EconomistService;
