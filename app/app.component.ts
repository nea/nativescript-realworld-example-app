import { Component } from "@angular/core";
import { filter } from "rxjs/operators";
import { RouterExtensions } from "nativescript-angular/router";
import { Router, NavigationEnd } from "@angular/router";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "application";
import { UserService } from "~/service/UserService";
import { Feedback } from "nativescript-feedback";
import { localize } from "nativescript-localize";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
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
     * @param userService
     */
    constructor(protected router: Router, protected routerExtensions: RouterExtensions, protected userService: UserService) {
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
        if(this.userService.logout()) {
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
}
