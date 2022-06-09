import {JSDOM} from "jsdom";
import {v4 as uuidv4} from "uuid";
import logger from "../infrastructure/configuration/logger";
import {Article} from "./article";
import {INewsPaperAdapter} from "./newsPaperAdapter";

export class Page {

    private static textContext(document, querySelector: string): string {
        if (document.querySelector(querySelector) != null) {
            return document.querySelector(querySelector).textContent;
        }
        return "N/A";
    }

    private htmlDom;
    private readonly newsPaper: INewsPaperAdapter;

    constructor(newsPaper: INewsPaperAdapter) {
        this.newsPaper = newsPaper;
    }

    public async retrieve() {
        // TODO It has to return a model
        logger.info("Retrieve HTML page of a newspaper.");
        this.htmlDom = await this.newsPaper.get();
    }

    public async parser(): Promise<Article[]> {
        logger.info("Parser the HTML page to retrieve each article.");
        const articles = [];
        const htmlDom = await this.newsPaper.get();
        const document = new JSDOM(htmlDom).window.document;
        const lis = document.getElementById("content").querySelectorAll("div.e1yv2jhn0");

        lis.forEach((element) => {
            const title = Page.textContext(element, "h3.ef0oilz0 a");
            const subtitle = Page.textContext(element, "p.e1smrlcj0");
            articles.push(new Article(uuidv4(), title, subtitle));
        });
        return articles;
    }
}
