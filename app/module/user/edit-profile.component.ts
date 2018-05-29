import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { PropertyChangeData } from "ui/page";
import { Feedback, FeedbackType, FeedbackPosition } from "nativescript-feedback";
import { localize } from "nativescript-localize";
import { Profile } from "~/model/Profile";
import { UserService } from "~/service/UserService";
import { PageRoute } from "nativescript-angular/router";
import { switchMap } from "rxjs/operators";
import { topmost } from "ui/frame";
import { RadDataFormComponent } from "nativescript-ui-dataform/angular/dataform-directives";
import { User } from "~/model/User";

@Component({
    selector: "conduit-edit-profile",
    moduleId: module.id,
    templateUrl: "./edit-profile.component.html",
    styleUrls: ["./user.css"]
})
export class EditProfileComponent implements OnInit {
    /** */
    public isLoading: boolean = false;
    /** */
    private feedback: Feedback;
    /** */
    public user: User = new User();
    /** */
    @ViewChild("formProfile") protected formProfile: RadDataFormComponent;

    /**
     *
     * @param router
     * @param userService
     */
    constructor(private router: Router, public userService: UserService) {
        this.feedback = new Feedback();
        Object.assign(this.user, this.userService.getUser());
    }

    /**
     *
     */
    public ngOnInit() {}

    /**
     *
     */
    public onSave() {
        this.formProfile.dataForm.validateAll().then(result => {
            if (!this.formProfile.dataForm.hasValidationErrors() && this.user.hasValidEmail()) {
                this.isLoading = true;
                //Update password (if any is given)
                if (this.user.password) {
                    this.userService.updatePassword(this.user.password).subscribe(
                        (user: User) => {},
                        error => {
                            this.feedback.error({
                                title: localize("error.general"),
                                message: JSON.stringify(error.error)
                            });
                        }
                    );
                }
                //Update User
                this.userService
                    .updateUser(this.user)
                    .subscribe(
                        (user: User) => {
                            this.feedback.success({
                                title: localize("user.form.saved"),
                                message: this.user.username
                            });
                        },
                        error => {
                            this.feedback.error({
                                title: localize("error.general"),
                                message: JSON.stringify(error.error)
                            });
                        }
                    )
                    .add(() => {
                        this.isLoading = false;
                        this.router.navigate(["/home"]);
                    });
            }
        });
    }

    /**
     *
     */
    public onBack() {
        topmost().goBack();
    }
}
