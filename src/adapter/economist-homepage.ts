import logger from "../logger";
import {IPage} from "./ipage";

class EconomistHomepage implements IPage {

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
