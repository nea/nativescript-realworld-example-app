import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ConduitService } from "~/service/ConduitService";
import { PageRoute } from "nativescript-angular/router";
import { Article } from "~/model/Article";
import { switchMap } from "rxjs/operators";
import { Feedback } from "nativescript-feedback";
import * as Toolbox from "nativescript-toolbox";
import { topmost } from "ui/frame";

@Component({
    selector: "conduit-view-article",
    moduleId: module.id,
    templateUrl: "./view-article.component.html",
    styleUrls: ["./article.css"],
    providers: [ConduitService]
})
export class ViewArticleComponent implements OnInit {
    /** */
    public article: Article;
    /** */
    public articleBody: string = "";
    /** */
    public isLoading: boolean = false;
    /** */
    private feedback: Feedback;

    /**
     *
     * @param router
     * @param pageRoute
     * @param conduit
     */
    constructor(private router: Router, private pageRoute: PageRoute, private conduit: ConduitService) {
        this.feedback = new Feedback();

        //
        this.pageRoute.activatedRoute.pipe(switchMap(activatedRoute => activatedRoute.params)).forEach(params => {
            if (params["slug"]) {
                this.isLoading = true;
                this.conduit.getArticle(params["slug"]).subscribe(
                    (article: Article) => {
                        this.article = article;
                        console.log(article.body);
                        this.articleBody = Toolbox.fromMarkdown(article.body, Toolbox.TargetFormat.Html, Toolbox.MarkdownDialect.Maruku);
                        console.log(this.articleBody);
                    },
                    error => {
                        console.log(error);
                        this.onBack();
                    },
                    () => {
                        this.isLoading = false;
                    }
                );
            }
        });
    }

    /**
     *
     */
    public ngOnInit() {}

    /**
     *
     */
    public onBack() {
        topmost().goBack();
    }
}
