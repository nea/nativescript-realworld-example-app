import { Profile } from "~/model/Profile";

/**
 *
 */
export class Article {
    /** */
    public slug?: string = null;
    /** */
    public title: string = null;
    /** */
    public description: string = null;
    /** */
    public body: string = null;
    /** */
    public tagList?: string[] = [];
    /** */
    public createdAt?: Date = null;
    /** */
    public updatedAt?: Date = null;
    /** */
    public favorited?: boolean = false;
    /** */
    public favoritesCount?: number = 0;
    /** */
    public author?: Profile = null;
}
