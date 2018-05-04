import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Page } from "ui/page";
import { isIOS } from "tns-core-modules/platform";
import { ConduitService } from "~/service/ConduitService";
import { Article } from "~/model/Article";
import { Articles } from "~/model/Articles";
import { UserService } from "~/service/UserService";
import { User } from "~/model/User";

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
    public articles: string = "Loading...";

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
                console.log(error);
            }
        );
        this.getArticles();

        this.conduit.getArticlesFeed().subscribe(
            (articles: Articles) => {
                console.log(articles);
            },
            error => {
                console.log(error);
            }
        );
    }

    public getArticles() {
        this.conduit.getArticles().subscribe(
            (articles: Articles) => {
                console.log(articles.articlesCount);
                this.articles = JSON.stringify(articles);
            },
            error => {
                this.articles = error;
            }
        );
    }
}
