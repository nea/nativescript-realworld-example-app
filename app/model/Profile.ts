import * as validator from "validator";

/**
 *
 */
export class Profile {
    /** */
    public username: string = null;
    /** */
    public bio: string = null;
    /** */
    public _image: string = null;
    /** */
    public following: boolean = false;

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
