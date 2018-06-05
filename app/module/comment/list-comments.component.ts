import { Component, ElementRef, OnInit, ViewChild, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Page, PropertyChangeData } from "ui/page";
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
import { localize } from "nativescript-localize";
import { Subscription } from "rxjs";
import * as dialogs from "ui/dialogs";
import { ListView } from "ui/list-view";

@Component({
    selector: "conduit-list-comments",
    moduleId: module.id,
    templateUrl: "./list-comments.component.html",
    styleUrls: ["./comment.css"]
})
export class ListCommentsComponent implements OnInit {
    /** */
    @Input("slug") public slug: string;
    /** */
    public comments: ObservableArray<Comment> = new ObservableArray<Comment>();
    /** */
    public isLoading: boolean = false;
    /** */
    private feedback: Feedback;

    /**
     *
     * @param router
     * @param conduit
     */
    constructor(private router: Router, private conduit: ConduitService, private userService: UserService) {
        this.feedback = new Feedback();
    }

    /**
     *
     */
    public ngOnInit() {
        this.reloadComments();
    }

    /**
     *
     */
    public reloadComments(): Subscription {
        this.isLoading = true;
        return this.conduit
            .getComments(this.slug)
            .subscribe(this.onLoadingComments, this.onLoadingError)
            .add(() => {
                this.onLoadingComplete();
            });
    }

    /**
     *
     */
    protected onLoadingComments = (comments: Comment[]) => {
        this.comments = new ObservableArray<Comment>();
        this.comments.push(comments);
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
     * @param args
     */
    public onAuthor(args) {
        this.router.navigate([`/profile/${args.object.text}`]);
    }

    /**
     * @param commentId
     */
    public onDelete(commentId: number) {
        dialogs.confirm(localize("comment.delete.confirm")).then(result => {
            if (result) {
                this.isLoading = true;
                this.conduit
                    .deleteComment(this.slug, commentId)
                    .subscribe(() => {}, this.onLoadingError)
                    .add(() => {
                        this.reloadComments();
                    });
            }
        });
    }
}
