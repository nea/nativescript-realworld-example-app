import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "~/service/UserService";
import { User } from "~/model/User";
import { SegmentedBar, SegmentedBarItem } from "ui/segmented-bar";
import { localize } from "nativescript-localize";
import { ListArticlesComponent } from "~/module/article/list-articles.component";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "application";
import { PropertyChangeData } from "tns-core-modules/ui/page/page";
import { registerElement } from "nativescript-angular/element-registry";
registerElement("Fab", () => require("nativescript-floatingactionbutton").Fab);

@Component({
    selector: "conduit-home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ["./home.css"]
})
export class HomeComponent implements OnInit {
    /** */
    protected isLoading: boolean = false;
    /** */
    protected isUserFeed: boolean = false;

    /**
     *
     * @param router
     * @param userService
     */
    constructor(protected router: Router, protected userService: UserService) {}

    /**
     *
     */
    public ngOnInit() {}

    /**
     *
     * @param args
     */
    public onFeedChange(args: PropertyChangeData) {
        this.isUserFeed = args.value === 0;
    }

    /**
     *
     */
    public onAddArticle() {
        this.router.navigate(["/editor"]);
    }

    /**
     *
     */
    public onDrawer() {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
