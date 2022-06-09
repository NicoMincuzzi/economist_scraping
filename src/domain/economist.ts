import ArticleEntity, {IArticle} from "./repository/article.schema";

export class Economist {
    public static from(article: IArticle) {
        return new Economist(article.articleId, article.title, article.subtitle,);
    }

    private readonly id: string;
    private readonly title: string;
    private readonly subtitle: string;

    constructor(id: string, title: string, subtitle: string) {
        this.id = id;
        this.title = title;
        this.subtitle = subtitle;
    }

    get getId(): string {
        return this.id;
    }

    get getTitle(): string {
        return this.title;
    }

    get getSubtitle(): string {
        return this.subtitle;
    }

    public to() {
        return new ArticleEntity({
            articleId: this.id,
            subtitle: this.subtitle,
            title: this.title,
        });
    }
}
