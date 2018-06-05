import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { PropertyChangeData } from "ui/page";
import { ConduitService } from "~/service/ConduitService";
import { Article } from "~/model/Article";
import { Articles } from "~/model/Articles";
import { RadListViewComponent } from "nativescript-ui-listview/angular";
import { ListViewEventData } from "nativescript-ui-listview";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import { Feedback, FeedbackType, FeedbackPosition } from "nativescript-feedback";
import { localize } from "nativescript-localize";
import { Subscription } from "rxjs";

@Component({
    selector: "conduit-list-articles",
    moduleId: module.id,
    templateUrl: "./list-articles.component.html",
    styleUrls: ["./article.css"]
})
export class ListArticlesComponent implements OnInit {
    /** */
    @Input("isUserFeed") public isUserFeed: boolean = false;
    /** */
    @Input("offsetInterval") public offsetInterval: number = 20;
    /** */
    @Input("tag") public tag: string;
    /** */
    @Input("author") public author: string;
    /** */
    @Input("favorited") public favorited: string;
    /** */
    @Input("limit") public limit: number = 20;
    /** */
    @Input("offset") public offset: number = 0;

    /** */
    public articles: ObservableArray<Article> = new ObservableArray<Article>();
    /** */
    public isLoading: boolean = false;
    /** */
    private feedback: Feedback;

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
            return this.conduit
                .getArticlesFeed(this.limit, this.offset)
                .subscribe(this.onLoadingArticles, this.onLoadingError)
                .add(() => {
                    this.onLoadingComplete();
                });
        } else {
            return this.conduit
                .getArticles(this.tag, this.author, this.favorited, this.limit, this.offset)
                .subscribe(this.onLoadingArticles, this.onLoadingError)
                .add(() => {
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
     * @param username
     */
    public onAuthor(username) {
        this.router.navigate([`/profile/${username}`]);
    }

    /**
     *
     * @param articleSlug
     */
    public onArticle(articleSlug: string) {
        this.router.navigate([`/article/${articleSlug}`]);
    }
}
