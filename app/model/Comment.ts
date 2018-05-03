import { Profile } from "~/model/Profile";

/**
 *
 */
export class Comment {
    /** */
    public id: number = 0;
    /** */
    public body: string = null;
    /** */
    public createdAt: Date = null;
    /** */
    public updatedAt: Date = null;
    /** */
    public author: Profile = null;
}
