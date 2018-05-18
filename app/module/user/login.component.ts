import { Component, ElementRef, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { alert, prompt } from "tns-core-modules/ui/dialogs";
import { Page } from "tns-core-modules/ui/page";
import { User } from "~/model/User";
import { UserService } from "~/service/UserService";
import { Feedback } from "nativescript-feedback";
import { localize } from "nativescript-localize";

@Component({
    selector: "conduit-login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ["./user.css"]
})
export class LoginComponent {
    /** */
    protected isLoggingIn = true;
    /** */
    protected user: User;
    /** */
    protected feedback: Feedback;
    /** */
    @ViewChild("password") protected password: ElementRef;
    /** */
    @ViewChild("confirmPassword") protected confirmPassword: ElementRef;

    /**
     *
     * @param page
     * @param router
     * @param userService
     */
    constructor(protected page: Page, protected router: Router, protected userService: UserService) {
        this.feedback = new Feedback();
        this.page.actionBarHidden = true;
        this.user = new User();
    }

    /**
     *
     */
    protected onSubmit() {
        if (!this.user.email || !this.password.nativeElement.text) {
            this.feedback.error({
                title: localize("error.general"),
                message: localize("user.form.error.missing")
            });
            return;
        }

        if (this.isLoggingIn) {
            this.login();
        } else {
            this.register();
        }
    }

    /**
     *
     */
    protected login() {
        this.userService.login(this.user.email, this.password.nativeElement.text).subscribe(() => {
            this.onBack();
        });
    }

    /**
     *
     */
    protected register() {
        if (this.password.nativeElement.text !== this.confirmPassword.nativeElement.text) {
            this.feedback.error({
                title: localize("error.general"),
                message: localize("user.form.error.passwordMismatch")
            });
            return;
        }
        this.userService.register(this.user.username, this.user.email, this.password.nativeElement.text).subscribe(() => {
            this.onBack();
        });
    }

    /**
     *
     */
    public onBack() {
        this.router.navigate(["/home"]);
    }
}
