import * as fs from "fs";
import HtmlParser from "../../src/htmlParser";
import {Economist} from "../../src/model/economist";

describe("economist home page parser", () => {

    it("check retrieve title and subtitle from a single article", () => {
        const dom = `<main role="main" id="content"><div class=\"css-9kdu96 e1yv2jhn0\"><p class=\"css-1129mxi eajo7ll0\">Leaders</p><h3 class=\"css-cxz0do ef0oilz0\"><a href=\"/leaders/2021/12/18/the-new-normal-is-already-here-get-used-to-it\" data-analytics=\"top_stories:headline_1\">The new normal is already here. Get used to it</a></h3><p class=\"css-1kan9v7 e1smrlcj0\">The era of predictable unpredictability is not going away</p></div></main>`;
        const result = new HtmlParser().parser(dom);
        const expected = new Economist("", "The new normal is already here. Get used to it", "The era of predictable unpredictability is not going away");
        expect(result[0].getTitle).toEqual(expected.getTitle);
        expect(result[0].getSubtitle).toEqual(expected.getSubtitle);
    });

    it("check retrieve info more articles", () => {
        const dom = `<main role="main" id="content"><div class="css-1fiyci e1yv2jhn0"><h3 class="css-g6fo13 ef0oilz0"><a href="/britain/2021/12/18/liz-truss-declares-an-end-to-the-age-of-introspection"data-analytics="top_stories:headline_5">Bagehot: Liz Truss declares an end to the age of introspection</a></h3><p class="css-qnkbrf e1smrlcj0">A new foreign secretary seeks to reshape British diplomacy</p></div>
                     <div class=\"css-9kdu96 e1yv2jhn0\"><p class=\"css-1129mxi eajo7ll0\">Leaders</p><h3 class=\"css-cxz0do ef0oilz0\"><a href=\"/leaders/2021/12/18/the-new-normal-is-already-here-get-used-to-it\"data-analytics=\"top_stories:headline_1\">The new normal is already here. Get used to it</a></h3><p class=\"css-1kan9v7 e1smrlcj0\">The era of predictable unpredictability is not going away</p></div></main>`;
        const result = new HtmlParser().parser(dom);
        expect(result.length).toEqual(2);
    });

    it("check retrieve all articles", () => {
        const dom = fs.readFileSync("./tests/resources/main.html", "utf8");
        const result = new HtmlParser().parser(dom);
        expect(result.length).toEqual(51);
    });

});
