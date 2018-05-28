import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { PropertyChangeData } from "ui/page";
import { RadListViewComponent } from "nativescript-ui-listview/angular";
import { ListViewEventData } from "nativescript-ui-listview";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import { Feedback, FeedbackType, FeedbackPosition } from "nativescript-feedback";
import { localize } from "nativescript-localize";
import { Profile } from "~/model/Profile";
import { UserService } from "~/service/UserService";
import { PageRoute } from "nativescript-angular/router";
import { switchMap } from "rxjs/operators";
import { topmost } from "ui/frame";

@Component({
    selector: "conduit-profile",
    moduleId: module.id,
    templateUrl: "./profile.component.html",
    styleUrls: ["./user.css"]
})
export class ProfileComponent implements OnInit {
    /** */
    public isLoading: boolean = false;
    /** */
    public isMyArticles: boolean = true;
    /** */
    private feedback: Feedback;
    /** */
    public profile: Profile;

    /**
     *
     * @param router
     * @param conduit
     */
    constructor(private router: Router, private pageRoute: PageRoute, public userService: UserService) {
        this.feedback = new Feedback();

        //Get the given username's profile
        this.pageRoute.activatedRoute.pipe(switchMap(activatedRoute => activatedRoute.params)).forEach(params => {
            this.isLoading = true;
            this.userService
                .getProfile(params["username"])
                .subscribe(
                    (profile: Profile) => {
                        this.profile = profile;
                    },
                    error => {
                        this.feedback.error({
                            title: localize("error.general"),
                            message: error
                        });
                    }
                )
                .add(() => {
                    this.isLoading = false;
                });
        });
    }

    /**
     *
     */
    public ngOnInit() {}

    /**
     *
     * @param args
     */
    public onFeedChange(args: PropertyChangeData) {
        this.isMyArticles = args.value === 0;
    }

    /**
     * Just follow/unfollow and set the local profile value expecting success.
     */
    public onFollow() {
        this.profile.following = !this.profile.following;
        this.userService.followUser(this.profile.username, this.profile.following).subscribe(
            (profile: Profile) => {
                this.profile = profile;
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
     */
    public onBack() {
        topmost().goBack();
    }
}
