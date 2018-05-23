import { AppiumDriver, Direction, SearchOptions, UIElement } from "nativescript-dev-appium";
import { assert } from "chai";

/**
 *
 */
export class Home {
    /**
     *
     * @param driver
     */
    constructor(private driver: AppiumDriver) {}

    /**
     *
     */
    public loaded = async () => {
        const lblTitle = await this.driver.findElementByText("Conduit");
        assert.isTrue(await lblTitle.isDisplayed());
        console.log("Conduit loaded!");
    };

    /**
     *
     */
    public tapOnAuthor = async () => {
        const author: UIElement = await this.driver.findElementByAccessibilityId('article-item-author-username');
        const username = await author.text();
        const authorElement: UIElement = await this.driver.findElementByAccessibilityId('article-item-author');
        await author.tap();
        const authorUsername = await this.driver.findElementByText(username);
        assert.isTrue(await authorUsername.isDisplayed());
        console.log("Author '" + username + "' loaded!");
    };
}
