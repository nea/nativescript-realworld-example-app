import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { RadDataFormComponent } from "nativescript-ui-dataform/angular/dataform-directives";
import { EntityProperty, DataFormEventData } from "nativescript-ui-dataform";
import { Article } from "~/model/Article";
import { ConduitService } from "~/service/ConduitService";
import { Feedback, FeedbackType, FeedbackPosition } from "nativescript-feedback";
import * as Toast from "nativescript-toast";
import { localize } from "nativescript-localize";
import { RadAutoCompleteTextViewComponent } from "nativescript-ui-autocomplete/angular/autocomplete-directives";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";

@Component({
    selector: "conduit-article",
    moduleId: module.id,
    templateUrl: "./article.component.html",
    styleUrls: ["./article.component.css"],
    providers: [ConduitService]
})
export class ArticleComponent implements OnInit {
    /** */
    public title: string;
    /** */
    public article: Article;
    /** */
    public isLoading: boolean = false;
    /** */
    private feedback: Feedback;
    /** */
    @ViewChild("formArticle") protected formArticle: RadDataFormComponent;
    /** */
    @ViewChild("tagsField") protected tagsField: RadAutoCompleteTextViewComponent;

    private tags: ObservableArray<string> = new ObservableArray<string>();

    /**
     *
     * @param router
     * @param route
     */
    constructor(private router: Router, private route: ActivatedRoute, private conduit: ConduitService) {
        this.feedback = new Feedback();
        this.route.params.subscribe(params => {
            if (params["slug"]) {
                this.isLoading = true;
                this.title = localize("article.edit");
                this.conduit.getArticle(params["slug"]).subscribe(
                    (article: Article) => {
                        this.article = article;
                        this.tags.push(article.tagList);
                    },
                    error => {
                        console.log(error);
                    },
                    () => {
                        this.isLoading = false;
                    }
                );
            } else {
                this.title = localize("article.add");
                this.article = new Article();
            }
        });
    }

    /**
     *
     */
    public ngOnInit() {
        this.conduit.getTags().subscribe((tags: string[]) => {
            console.log(tags);
            this.tags.push(tags);
            console.log(this.tags);
        });

        let items: ObservableArray<string> = this.tags;
        this.tagsField.autoCompleteTextView.loadSuggestionsAsync = function(text) {
            let promise = new Promise(function(resolve, reject) {
                console.log(text);
                items.push(text);
                resolve(items);
            });
            return promise;
        };
    }

    /**
     *
     */
    public onBack() {
        this.router.navigate(["/home"]);
    }

    /**
     *
     */
    public onSave() {
        this.formArticle.dataForm.validateAll().then(result => {
            if (result) {
                console.log(this.article.tagList);
                console.log(this.tagsField);
                console.log(this.tagsField.nativeElement);
                // this.isLoading = true;
                // this.conduit.addArticle(this.article.title, this.article.description, this.article.body).subscribe((article: Article) => {
                //     this.feedback.success({
                //         title: "Article saved!",
                //         message: article.title
                //     });
                // }, error => {
                //     this.feedback.error({
                //         title: localize("error.general"),
                //         message: error
                //     });
                // }, () => {
                //     this.isLoading = false;
                //     this.onBack();
                // });
            }
        });
    }

    get tagsProvider(): ObservableArray<string> {
        return this.tags;
    }
}
