import Article from "../repository/article.schema";

export class Economist {
    private readonly id: string;
    private readonly title: string;
    private readonly subtitle: string;

    constructor(id: string, title: string, subtitle: string) {
        this.id = id;
        this.title = title;
        this.subtitle = subtitle;
    }

    get getTitle(): string {
        return this.title;
    }

    get getSubtitle(): string {
        return this.subtitle;
    }

    public to() {
        return new Article({
            articleId: this.id,
            subtitle: this.subtitle,
            title: this.title,
        });
    }
}
