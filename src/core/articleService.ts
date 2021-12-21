import {IPage} from "../adapter/page";
import {Economist} from "../model/economist";
import {IRepository} from "../repository/repository";
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

    public async retrieveAll(): Promise<Economist[]> {
        const htmlDom = await this.page.retrieve();
        const newsItems: Economist[] = this.parser.run(htmlDom);
        this.repository.creatAll(newsItems);
        return newsItems;
    }

    public retrieveById(articleId: string) {
        return undefined;
    }
}

export default ArticleService;
