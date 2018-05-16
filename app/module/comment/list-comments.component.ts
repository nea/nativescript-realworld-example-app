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
import * as dialogs from "ui/dialogs";

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

    /** */
    @ViewChild("listViewComments") public listViewComments: RadListViewComponent;

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
        this.loadComments();
    }

    /**
     *
     */
    protected loadComments(): Subscription {
        this.isLoading = true;
        return this.conduit.getComments(this.slug).subscribe(this.onLoadingComments, this.onLoadingError, () => {
            this.onLoadingComplete();
        });
    }

    /**
     *
     * @param args
     */
    public onPullToRefresh(args: ListViewEventData) {
        //Reset
        this.comments = new ObservableArray<Comment>();
        //Reload
        this.loadComments().add(() => {
            args.object.notifyPullToRefreshFinished();
        });
    }

    /**
     *
     */
    protected onLoadingComments = (comments: Comment[]) => {
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
                this.conduit.deleteComment(this.slug, commentId).subscribe(() => {}, this.onLoadingError, () => {
                    this.loadComments();
                });
            }
        });
    }
}
