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

    public retrieveAll(): Economist[] {
        const htmlDom = this.page.retrieve();
        return this.parser.run(htmlDom);
    }
}

export default ArticleService;
