import {JSDOM} from "jsdom";
import {v4 as uuidv4} from "uuid";
import {Economist} from "./model/Economist";

class HtmlParser {
    private document;

    public parser(page): Economist {
        this.document = new JSDOM(page).window.document;
        return new Economist(uuidv4(), this.textContext("h3.ef0oilz0 a"), this.textContext("p.e1smrlcj0"));
    }

    private textContext(querySelector: string): string {
        return this.document.querySelector(querySelector).textContent;
    }
}

export default HtmlParser;
