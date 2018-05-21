import { Component, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
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
import { markdown } from 'markdown';

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
    public isLoggedIn: boolean = UserService.IsLoggedIn();
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
        protected userService: UserService,
        protected modal: ModalDialogService,
        protected vcRef: ViewContainerRef
    ) {
        this.feedback = new Feedback();

        //
        this.pageRoute.activatedRoute.pipe(switchMap(activatedRoute => activatedRoute.params)).forEach(params => {
            if (params["slug"]) {
                this.isLoading = true;
                this.conduit.getArticle(params["slug"]).subscribe(
                    (article: Article) => {
                        this.article = article;
                        this.articleBody = markdown.toHTML(article.body, "Maruku");
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
                console.log(error);
            }
        );
    }

    /**
     *
     * @param args
     */
    public onAuthor(args) {
        this.router.navigate([`/profile/${args.object.text}`]);
    }

    /**
     *
     */
    public onShare() {
        SocialShare.shareText(`<div><h1>${this.article.title}</h1><br /><p>${this.article.description}</p><br />${this.articleBody}</div>`);
    }

    /**
     *
     */
    public onBack() {
        topmost().goBack();
    }
}
