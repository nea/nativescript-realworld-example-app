import { Component, ElementRef, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { alert, prompt } from "tns-core-modules/ui/dialogs";
import { Page } from "tns-core-modules/ui/page";
import { User } from "~/model/User";
import { UserService } from "~/service/UserService";
import { Feedback } from "nativescript-feedback";
import { localize } from "nativescript-localize";
import { RouterExtensions } from "nativescript-angular/router";
import * as isEmail from "validator/lib/isEmail";

@Component({
    selector: "conduit-login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ["./user.css"]
})
export class LoginComponent {
    /** */
    public isLoggingIn = true;
    /** */
    public isLoading = false;
    /** */
    public user: User;
    /** */
    protected feedback: Feedback;
    /** */
    @ViewChild("username") public username: ElementRef;
    /** */
    @ViewChild("password") public password: ElementRef;
    /** */
    @ViewChild("confirmPassword") public confirmPassword: ElementRef;

    /**
     *
     * @param page
     * @param router
     * @param userService
     */
    constructor(protected page: Page, protected routerExtensions: RouterExtensions, public userService: UserService) {
        this.feedback = new Feedback();
        this.page.actionBarHidden = true;
        this.user = new User();
    }

    /**
     *
     */
    public onSubmit() {
        if (!this.user.email || !this.password.nativeElement.text) {
            this.showError("user.form.error.missing");
            return;
        }
        if (!isEmail(this.user.email)) {
            this.showError("user.form.error.validEmail");
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
        this.isLoading = true;
        this.userService
            .login(this.user.email, this.password.nativeElement.text)
            .subscribe(
                () => {
                    this.onBack();
                },
                error => {
                    this.showError(JSON.stringify(error.error));
                }
            )
            .add(() => {
                this.isLoading = false;
            });
    }

    /**
     *
     */
    protected register() {
        if (this.password.nativeElement.text !== this.confirmPassword.nativeElement.text) {
            this.showError("user.form.error.passwordMismatch");
            return;
        }
        if (!this.user.username) {
            this.showError("user.form.error.validUsername");
            return;
        }
        this.isLoading = true;
        this.userService
            .register(this.user.username, this.user.email, this.password.nativeElement.text)
            .subscribe(() => {
                this.onBack();
            })
            .add(() => {
                this.isLoading = false;
            });
    }

    /**
     *
     */
    public onBack() {
        this.routerExtensions.navigate(["/home"], { clearHistory: true });
    }

    /**
     * @param messageKey Key to localize as error message
     */
    protected showError(messageKey: string) {
        this.feedback.error({
            title: localize("error.general"),
            message: localize(messageKey)
        });
    }
}
