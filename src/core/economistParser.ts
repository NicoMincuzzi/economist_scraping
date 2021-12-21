import {JSDOM} from "jsdom";
import {v4 as uuidv4} from "uuid";
import {Economist} from "../model/economist";
import {IParser} from "./parser";

class EconomistParser implements IParser {
    private static textContext(document, querySelector: string): string {
        if (document.querySelector(querySelector) != null) {
            return document.querySelector(querySelector).textContent;
        }
        return "N/A";
    }

    public run(page): Economist[] {
        const articles = [];
        const document = new JSDOM(page).window.document;
        const lis = document.getElementById("content").querySelectorAll("div.e1yv2jhn0");

        lis.forEach((element) => {
            const title = EconomistParser.textContext(element, "h3.ef0oilz0 a");
            const subtitle = EconomistParser.textContext(element, "p.e1smrlcj0");
            articles.push(new Economist(uuidv4(), title, subtitle));
        });
        return articles;
    }
}

export default EconomistParser;
