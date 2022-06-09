import {Document, model, Schema} from "mongoose";

export interface IArticle extends Document {
    articleId: string;
    title: string;
    subtitle: string;
    body?: string;
    lastUpdated?: Date;
}

const ArticleSchema = new Schema<IArticle>({
    articleId: {type: String, required: true},
    body: String,
    lastUpdated: {default: new Date(), type: Date},
    subtitle: {type: String, required: true},
    title: {type: String, required: true},
});

const ArticleEntity = model<IArticle>("ArticleEntity", ArticleSchema);
export default ArticleEntity;
