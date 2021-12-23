import axios from "axios";
import {IPage} from "./page";

class EconomistHomepage implements IPage {
    public async retrieve() {
        const response = await axios.get("https://www.economist.com/");
        return response.data;
    }
}

export default EconomistHomepage;
