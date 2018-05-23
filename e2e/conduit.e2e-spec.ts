import { AppiumDriver, createDriver, SearchOptions, Direction } from "nativescript-dev-appium";
import { assert } from "chai";
import { Home } from "./home";

/**
 *
 */
describe("Conduit", () => {
    /** */
    let driver: AppiumDriver;
    /** */
    let home: Home;

    /**
     *
     */
    before(async () => {
        driver = await createDriver();
        home = new Home(driver);
    });

    /**
     *
     */
    afterEach(async function() {
        if (this.currentTest.state === "failed") {
            await driver.logPageSource(this.currentTest.title);
            await driver.logScreenshot(this.currentTest.title);
        }
        await driver.navBack();
    });

    /**
     *
     */
    after(async () => {
        await driver.quit();
    });

    /**
     *
     */
    it("should load articles and tap on an author", async () => {
        await home.loaded();
        await home.tapOnAuthor();
    });
});
