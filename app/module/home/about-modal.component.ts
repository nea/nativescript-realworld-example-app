import { Component, ViewChild, ElementRef } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
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
     */
    public constructor(private params: ModalDialogParams) {}

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
