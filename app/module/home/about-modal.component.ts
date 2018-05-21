import { Component, ViewChild, ElementRef } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { Page } from "tns-core-modules/ui/page/page";
import * as utils from "utils/utils";

@Component({
    selector: "conduit-about-modal",
    moduleId: module.id,
    templateUrl: "./about-modal.component.html",
    styleUrls: ["./home.css"]
})
export class AboutModal {
    /**
     *
     * @param params
     * @param page
     */
    public constructor(private params: ModalDialogParams, private page: Page) {
        this.page.on("unloaded", () => {
            this.params.closeCallback();
        });
    }

    /**
     *
     */
    public onClose() {
        this.params.closeCallback();
    }

    /**
     *
     * @param url
     */
    public onLink(url: string) {
        utils.openUrl(url);
    }
}
