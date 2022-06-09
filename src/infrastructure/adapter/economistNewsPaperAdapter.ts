import axios from "axios";
import {INewsPaperAdapter} from "../../domain/newsPaperAdapter";

class EconomistNewsPaperAdapter implements INewsPaperAdapter {
    public async get() {
        const response = await axios.get("https://www.economist.com/");
        return response.data;
    }
}

export default EconomistNewsPaperAdapter;
