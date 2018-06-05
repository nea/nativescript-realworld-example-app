import { Component, ViewContainerRef } from "@angular/core";
import { filter } from "rxjs/operators";
import { RouterExtensions } from "nativescript-angular/router";
import { Router, NavigationEnd } from "@angular/router";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "application";
import { UserService } from "~/service/UserService";
import { Feedback } from "nativescript-feedback";
import { localize } from "nativescript-localize";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { AboutModal } from "~/module/home/about-modal.component";
import * as utils from "utils/utils";

@Component({
    selector: "conduit-app",
    templateUrl: "app.component.html",
    providers: [ModalDialogService]
})
export class AppComponent {
    /** */
    protected activatedUrl: string;
    /** */
    protected feedback: Feedback;

    /**
     *
     * @param router
     * @param routerExtensions
     * @param modal
     * @param vcRef
     * @param userService
     */
    constructor(
        protected router: Router,
        protected routerExtensions: RouterExtensions,
        protected modal: ModalDialogService,
        protected vcRef: ViewContainerRef,
        public userService: UserService
    ) {
        this.feedback = new Feedback();
    }

    /**
     *
     */
    public ngOnInit() {
        this.activatedUrl = "/home";
        this.router.events
            .pipe(filter((event: any) => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => (this.activatedUrl = event.urlAfterRedirects));
    }

    /**
     *
     */
    public onLogout() {
        if (this.userService.logout()) {
            this.feedback.success({
                title: localize("drawer.logout"),
                message: localize("drawer.feedback.loggedOut")
            });
        }
    }

    /**
     *
     * @param url
     */
    public isSelected(url: string): boolean {
        return this.activatedUrl === url;
    }

    /**
     *
     * @param route
     */
    public onItem(route: string): void {
        this.routerExtensions.navigate([route], {
            transition: {
                name: "fade"
            }
        });

        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }

    /**
     * Show the "About" modal
     */
    public onAbout() {
        this.modal.showModal(AboutModal, {
            fullscreen: false,
            viewContainerRef: this.vcRef
        });
    }

    /**
     *
     */
    public onCreated() {
        utils.openUrl("https://github.com/nea/");
    }
}
