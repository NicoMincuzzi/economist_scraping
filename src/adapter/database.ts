import mongoose from "mongoose";
import logger from "../logger";

class MongoDatabase {
    private dbUri: string;

    constructor(dbUri: string) {
        this.dbUri = dbUri;
    }

    public init(): void {
        mongoose.connect(this.dbUri)
            .then(() => {
                return logger.info(`Successfully connected to ${this.dbUri}`);
            })
            .catch((error) => {
                logger.error("Error connecting to database: ", error);
                return process.exit(1);
            });
    }
}

export default MongoDatabase;
