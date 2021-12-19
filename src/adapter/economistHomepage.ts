import logger from "../logger";
import {Page} from "./page";

class EconomistHomepage implements Page {

    public async retrieve() {
        const axios = require("axios");

        return await axios.get("https://www.economist.com/")
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                logger.error(error);
            });
    }

}

export default EconomistHomepage;
