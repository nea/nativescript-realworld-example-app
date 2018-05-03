import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Page } from "ui/page";
import { isIOS } from "tns-core-modules/platform";
import { ConduitService } from "~/service/ConduitService";

@Component({
    selector: "conduit-home",
    providers: [ConduitService],
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
    constructor(private router: Router, private page: Page, public conduit: ConduitService) {}

    /**
     *
     */
    public ngOnInit() {
        this.page.className = "home";
        this.getArticles();
    }


    public getArticles() {
        this.conduit.getArticles("ljhdljas").subscribe((result) => {
            this.articles = JSON.stringify(result);
        }, (error) => {
            this.articles = error;
        });
    }
}
