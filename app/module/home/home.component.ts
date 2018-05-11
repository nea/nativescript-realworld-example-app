import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Page, PropertyChangeData } from "ui/page";
import { isIOS } from "tns-core-modules/platform";
import { ConduitService } from "~/service/ConduitService";
import { Article } from "~/model/Article";
import { Articles } from "~/model/Articles";
import { UserService } from "~/service/UserService";
import { User } from "~/model/User";
import { RadListViewComponent } from "nativescript-ui-listview/angular";
import { ListViewEventData } from "nativescript-ui-listview";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import { SegmentedBar, SegmentedBarItem } from "ui/segmented-bar";
import { Feedback, FeedbackType, FeedbackPosition } from "nativescript-feedback";
import * as Toast from "nativescript-toast";
import { localize } from "nativescript-localize";
import { ListArticlesComponent } from "~/module/article/list-articles.component";

import { registerElement } from "nativescript-angular/element-registry";
registerElement("Fab", () => require("nativescript-floatingactionbutton").Fab);

@Component({
    selector: "conduit-home",
    providers: [ConduitService, UserService],
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
    /** */
    public isLoading: boolean = false;
    /** */
    public isUserFeed: boolean = false;

    /**
     *
     * @param router
     * @param conduit
     * @param userService
     */
    constructor(private router: Router, public userService: UserService) {}

    /**
     *
     */
    public ngOnInit() {
        this.userService.login("test1234@test.de", "test1234").subscribe(
            (user: User) => {
                console.log(user);
            },
            error => {
                console.log(error);
            }
        );
    }

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
}
