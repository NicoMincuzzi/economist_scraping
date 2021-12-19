import HtmlParser from "../../src/html-parser";
import {Economist} from "../../src/model/Economist";

describe("economist home page parser", () => {

    it("check retrieve title and subtitle from each news", () => {
        const dom = `<div class=\"css-9kdu96 e1yv2jhn0\"><p class=\"css-1129mxi eajo7ll0\">Leaders</p><h3 class=\"css-cxz0do ef0oilz0\"><a href=\"/leaders/2021/12/18/the-new-normal-is-already-here-get-used-to-it\" data-analytics=\"top_stories:headline_1\">The new normal is already here. Get used to it</a></h3><p class=\"css-1kan9v7 e1smrlcj0\">The era of predictable unpredictability is not going away</p></div>`;
        const result = new HtmlParser().parser(dom);
        const expected = new Economist("", "The new normal is already here. Get used to it", "The era of predictable unpredictability is not going away");
        expect(result).toEqual(expected);
    });

});
