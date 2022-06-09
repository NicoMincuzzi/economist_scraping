import logger from "../infrastructure/logger";
import {Page} from "../domain/page";
import {IArticleRepository} from "../domain/repository/articleRepository";
import ApiError from "../infrastructure/server/apiError";
import {Economist} from "../domain/economist";

class CreateArticle {
    private repository: IArticleRepository;
    private page: Page;

    constructor(repository: IArticleRepository, page: Page) {
        this.repository = repository;
        this.page = page;
    }

    public async createAndRetrieveAll(): Promise<string[]> {
        try {
            const newsItems: Economist[] = await this.page.parser();

            logger.info("Persist all retrieved articles.");
            this.repository.persistAll(newsItems);
            return newsItems.map((newItem) => {
                return newItem.getId;
            });
        } catch (e) {
            logger.error(e);
            throw new ApiError();
        }
    }
}

export default CreateArticle;
