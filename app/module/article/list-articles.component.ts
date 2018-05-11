import { Component, ElementRef, OnInit, ViewChild, Input } from "@angular/core";
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
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: "conduit-list-articles",
    providers: [ConduitService],
    moduleId: module.id,
    templateUrl: "./list-articles.component.html",
    styleUrls: ["./list-articles.component.css"]
})
export class ListArticlesComponent implements OnInit {
    /** */
    @Input("isUserFeed") public isUserFeed: boolean = false;
    /** */
    @Input("offsetInterval") public offsetInterval: number = 20;
    /** */
    @Input("tag") public tag?: string;
    /** */
    @Input("author") public author?: string;
    /** */
    @Input("favorited") public favorited?: string;
    /** */
    @Input("limit") public limit?: number = 20;
    /** */
    @Input("offset") public offset: number = 0;

    /** */
    public articles: ObservableArray<Article> = new ObservableArray<Article>();
    /** */
    public isLoading: boolean = false;
    /** */
    private feedback: Feedback;

    /** */
    @ViewChild("listViewArticles") public listViewArticles: RadListViewComponent;

    /**
     *
     * @param router
     * @param conduit
     */
    constructor(private router: Router, private conduit: ConduitService) {
        this.feedback = new Feedback();
    }

    /**
     *
     */
    public ngOnInit() {
        this.loadArticles();
    }

    /**
     *
     */
    protected loadArticles(): Subscription {
        this.isLoading = true;
        if (this.isUserFeed) {
            return this.conduit.getArticlesFeed(this.limit, this.offset).subscribe(this.onLoadingArticles, this.onLoadingError, () => {
                this.onLoadingComplete();
            });
        } else {
            return this.conduit
                .getArticles(this.tag, this.author, this.favorited, this.limit, this.offset)
                .subscribe(this.onLoadingArticles, this.onLoadingError, () => {
                    this.onLoadingComplete();
                });
        }
    }

    /**
     *
     * @param args
     */
    public onPullToRefresh(args: ListViewEventData) {
        //Reset articles
        this.articles = new ObservableArray<Article>();
        //Reload
        this.loadArticles().add(() => {
            args.object.notifyPullToRefreshFinished();
        });
    }

    /**
     *
     * @param args
     */
    public onLoadMoreData(args: ListViewEventData) {
        //Increase offset
        this.offset += this.offsetInterval;
        //and load more data
        this.loadArticles().add(() => {
            args.object.notifyLoadOnDemandFinished();
            args.returnValue = true;
        });
    }

    /**
     *
     */
    protected onLoadingArticles = (articles: Articles) => {
        this.articles.push(articles.articles);
    };

    /**
     *
     */
    protected onLoadingError = error => {
        this.feedback.error({
            title: localize("error.general"),
            message: error
        });
    };

    /**
     *
     */
    protected onLoadingComplete = () => {
        this.isLoading = false;
    };

    /**
     *
     */
    public onAuthor(args) {
        this.router.navigate([`/profile/${args.object.text}`]);
    }
}
