import {IPage} from "../adapter/page";
import {Economist} from "../model/economist";
import {IParser} from "./parser";

class ArticleService {

    private page: IPage;
    private parser: IParser;

    constructor(page: IPage, parser: IParser) {
        this.page = page;
        this.parser = parser;
    }

    public async retrieveAll(): Promise<Economist[]> {
        const htmlDom = await this.page.retrieve();
        return this.parser.run(htmlDom);
    }

    public retrieveById(articleId: string) {
        return undefined;
    }
}

export default ArticleService;
