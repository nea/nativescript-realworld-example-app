import * as validator from "validator";

/**
 *
 */
export class User {
    /** */
    public id?: number = null;
    /** */
    public email: string = null;
    /** */
    public token?: string = null;
    /** */
    public username: string = null;
    /** */
    public bio?: string = null;
    /** */
    public _image?: string = null;
    /** */
    public password?: string = null;
    /** */
    public createdAt?: Date = null;
    /** */
    public updatedAt?: Date = null;

    /**
     *
     */
    public hasValidEmail(): boolean {
        return validator.isEmail(this.email);
    }

    /**
     * @return The image url or a default
     */
    public get image(): string {
        return validator.isURL(this._image) ? this._image : "https://static.productionready.io/images/smiley-cyrus.jpg";
    }

    /**
     * @param image
     */
    public set image(image: string) {
        this._image = image;
    }
}
