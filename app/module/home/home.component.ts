import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Page } from "ui/page";
import { isIOS } from "tns-core-modules/platform";

@Component({
    selector: "conduit-home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {

    /** */
    public title: string = "Home";

    /**
     *
     * @param router
     * @param page
     */
    constructor(private router: Router, private page: Page) {}

    /**
     *
     */
    public ngOnInit() {
        this.page.className = "home";
    }
}
