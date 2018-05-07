import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Page } from "ui/page";
import { isIOS } from "tns-core-modules/platform";
import { ConduitService } from "~/service/ConduitService";
import { Article } from "~/model/Article";
import { Articles } from "~/model/Articles";
import { UserService } from "~/service/UserService";
import { User } from "~/model/User";
import { RadListViewComponent } from "nativescript-ui-listview/angular";
import { ListViewEventData } from "nativescript-ui-listview";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";

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
    @ViewChild("lvArticles") public listViewArticles: RadListViewComponent;

    /**
     *
     * @param router
     * @param page
     * @param conduit
     */
    constructor(private router: Router, private page: Page, public conduit: ConduitService, public userService: UserService) {}

    /**
     *
     */
    public ngOnInit() {
        this.page.className = "home";
        this.userService.login("test1234@test.de", "test1234").subscribe(
            (user: User) => {
                console.log(user);
            },
            error => {
                console.log("Login");
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
        this.conduit.getArticles().subscribe(
            (articles: Articles) => {
                console.log(articles.articlesCount);
                this.articles = new ObservableArray<Article>(articles.articles);
            },
            error => {
                console.log("Error");
                console.log(error);
                this.isLoading = false;
            },
            () => {
                this.isLoading = false;
                if (args) {
                    args.object.notifyPullToRefreshFinished();
                }
            }
        );
    }
}
