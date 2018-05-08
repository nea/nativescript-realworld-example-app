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
    public title: string = "Home";
    /** */
    public articles: ObservableArray<Article>;
    /** */
    public isLoading: boolean = false;
    /** */
    protected selectedFeed: number = 1;
    /** */
    protected offset: number = 0;
    /** */
    private feedback: Feedback;
    /** */
    @ViewChild("lvArticles") public listViewArticles: RadListViewComponent;

    /**
     *
     * @param router
     * @param conduit
     * @param userService
     */
    constructor(private router: Router, public conduit: ConduitService, public userService: UserService) {
        this.feedback = new Feedback();
    }

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
        this.onReloadArticles();
    }

    /**
     *
     * @param args
     */
    public onReloadArticles(args: ListViewEventData = null) {
        this.isLoading = true;
        this.articles = new ObservableArray<Article>();
        if (this.selectedFeed === 0) {
            this.conduit.getArticlesFeed().subscribe(this.onLoadingArticles, this.onLoadingError, () => {
                this.onLoadingComplete();
                if (args) {
                    args.object.notifyPullToRefreshFinished();
                }
            });
        } else {
            this.conduit.getArticles().subscribe(this.onLoadingArticles, this.onLoadingError, () => {
                this.onLoadingComplete();
                if (args) {
                    args.object.notifyPullToRefreshFinished();
                }
            });
        }
    }

    protected onLoadingArticles = (articles: Articles) => {
        this.articles.push(articles.articles);
    };

    protected onLoadingError = error => {
        this.feedback.error({
            title: "An error occured during loading!",
            message: error
        });
    };

    protected onLoadingComplete = () => {
        this.isLoading = false;
    };

    public onLoadMoreDataRequested(args: ListViewEventData) {
        this.isLoading = true;
        this.offset += 20;
        Toast.makeText(localize("article.loading")).show();
        this.conduit
            .getArticles(undefined, undefined, undefined, 20, this.offset)
            .subscribe(this.onLoadingArticles, this.onLoadingError, () => {
                this.onLoadingComplete();
                Toast.makeText(localize("article.loaded")).show();
                args.object.notifyLoadOnDemandFinished();
                args.returnValue = true;
            });
    }

    /**
     *
     * @param args
     */
    public onFeedChange(args: PropertyChangeData) {
        this.selectedFeed = args.value;
        this.onReloadArticles();
    }

    /**
     *
     */
    public onAddArticle() {
        this.router.navigate(["/article"]);
    }
}
