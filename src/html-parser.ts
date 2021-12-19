import {JSDOM} from "jsdom";
import {Economist} from "./model/Economist";

class HtmlParser {
    public parser(page): Economist {
        const dom = new JSDOM(page);
        const title = dom.window.document.querySelector("h3.ef0oilz0 a").textContent;
        const subtitle = dom.window.document.querySelector("p.e1smrlcj0").textContent;
        return new Economist("", title, subtitle);
    }
}

export default HtmlParser;
