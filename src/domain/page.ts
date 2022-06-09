import {JSDOM} from "jsdom";
import {v4 as uuidv4} from "uuid";
import {INewsPaperAdapter} from "../infrastructure/newsPaperAdapter";
import logger from "../infrastructure/logger";
import {Economist} from "./economist";

export class Page {
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

    public async parser(): Promise<Economist[]> {
        logger.info("Parser the HTML page to retrieve each article.");
        const articles = [];
        const htmlDom = await this.newsPaper.get();
        const document = new JSDOM(htmlDom).window.document;
        const lis = document.getElementById("content").querySelectorAll("div.e1yv2jhn0");

        lis.forEach((element) => {
            const title = this.textContext(element, "h3.ef0oilz0 a");
            const subtitle = this.textContext(element, "p.e1smrlcj0");
            articles.push(new Economist(uuidv4(), title, subtitle));
        });
        return articles;
    }

    private textContext(document, querySelector: string): string {
        if (document.querySelector(querySelector) != null) {
            return document.querySelector(querySelector).textContent;
        }
        return "N/A";
    }
}
