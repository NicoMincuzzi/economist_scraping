import {Article} from "../domain/article";
import {Page} from "../domain/page";
import {IArticleRepository} from "../domain/repository/articleRepository";
import logger from "../infrastructure/configuration/logger";
import ApiError from "../infrastructure/server/apiError";

class RetrieveArticle {
    private repository: IArticleRepository;
    private page: Page;

    constructor(repository: IArticleRepository, page: Page) {
        this.repository = repository;
        this.page = page;
    }

    public async all(): Promise<string[]> {
        try {
            const newsItems: Article[] = await this.page.parser();

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

export default RetrieveArticle;
