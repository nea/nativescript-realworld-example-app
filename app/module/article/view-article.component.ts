import { Component, OnInit, ViewChild, ViewContainerRef, ElementRef } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ConduitService } from "~/service/ConduitService";
import { PageRoute } from "nativescript-angular/router";
import { Article } from "~/model/Article";
import { switchMap } from "rxjs/operators";
import { Feedback } from "nativescript-feedback";
import { topmost } from "ui/frame";
import * as SocialShare from "nativescript-social-share";
import { UserService } from "~/service/UserService";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { WriteCommentModal } from "~/module/comment/write-comment-modal.component";
import { ListCommentsComponent } from "~/module/comment/list-comments.component";
import { markdown } from "markdown";
import { localize } from "nativescript-localize";
import { ActionBar } from "tns-core-modules/ui/action-bar/action-bar";

@Component({
    selector: "conduit-view-article",
    moduleId: module.id,
    templateUrl: "./view-article.component.html",
    styleUrls: ["./article.css"],
    providers: [ModalDialogService]
})
export class ViewArticleComponent implements OnInit {
    /** */
    public article: Article;
    /** */
    public articleBody: string = "";
    /** */
    public isLoading: boolean = false;
    /** */
    protected feedback: Feedback;
    /** */
    @ViewChild("commentsList") protected commentsList: ListCommentsComponent;

    /**
     *
     * @param router
     * @param pageRoute
     * @param conduit
     */
    constructor(
        private router: Router,
        private pageRoute: PageRoute,
        protected conduit: ConduitService,
        public userService: UserService,
        protected modal: ModalDialogService,
        protected vcRef: ViewContainerRef
    ) {
        this.feedback = new Feedback();

        //
        this.pageRoute.activatedRoute.pipe(switchMap(activatedRoute => activatedRoute.params)).forEach(params => {
            if (params["slug"]) {
                this.isLoading = true;
                this.conduit
                    .getArticle(params["slug"])
                    .subscribe(
                        (article: Article) => {
                            this.article = article;
                            this.articleBody = markdown.toHTML(article.body, "Maruku");
                        },
                        error => {
                            this.feedback.error({
                                title: localize("error.general"),
                                message: error
                            });
                            this.onBack();
                        }
                    )
                    .add(() => {
                        this.isLoading = false;
                    });
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
    public onWriteComment() {
        this.modal
            .showModal(WriteCommentModal, {
                context: this.article,
                fullscreen: true,
                viewContainerRef: this.vcRef
            })
            .then(res => {
                if (res) {
                    this.commentsList.reloadComments();
                }
            });
    }

    /**
     *
     */
    public onFavorited() {
        this.article.favorited = !this.article.favorited;
        this.conduit.favorArticle(this.article.slug, this.article.favorited).subscribe(
            (article: Article) => {
                this.article = article;
            },
            error => {
                this.feedback.error({
                    title: localize("error.general"),
                    message: error
                });
            }
        );
    }

    /**
     *
     * @param username
     */
    public onAuthor(username) {
        this.router.navigate([`/profile/${username}`]);
    }

    /**
     *
     */
    public onShare() {
        SocialShare.shareText(`${this.article.title}

        ${this.article.description}

        ${this.articleBody}`);
    }

    /**
     *
     */
    public onEdit() {
        this.router.navigate([`/editor/${this.article.slug}`]);
    }

    /**
     *
     */
    public onBack() {
        topmost().goBack();
    }
}
