import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { AbstractHttpService } from "~/service/AbstractHttpService";
import { setString, getString } from "tns-core-modules/application-settings/application-settings";
import { Feedback } from "nativescript-feedback";
import { localize } from "nativescript-localize";
import * as isURL from "validator/lib/isURL";
import { topmost } from "tns-core-modules/ui/frame/frame";
import { UserService } from "~/service/UserService";

@Component({
    selector: "conduit-settings",
    moduleId: module.id,
    templateUrl: "./settings.component.html",
    styleUrls: ["./home.css"]
})
export class SettingsComponent implements OnInit {
    /** */
    private feedback: Feedback;
    /** */
    public url: string;
    /** */
    @ViewChild("txtUrl") protected txtUrl: ElementRef;

    /**
     *
     * @param router
     * @param userService
     */
    constructor(protected router: Router, public userService: UserService) {
        this.feedback = new Feedback();
    }

    /**
     *
     */
    public ngOnInit() {
        this.url = getString("apiUrl", AbstractHttpService.PRODUCTIONREADY_IO_API_BASE_URL);
    }

    /**
     *
     */
    public onSave() {
        if (!this.txtUrl.nativeElement.text || !isURL(this.txtUrl.nativeElement.text)) {
            this.feedback.warning({
                title: localize("error.general"),
                message: localize("settings.urlWarning")
            });
            return;
        }
        this.save(this.txtUrl.nativeElement.text);
        topmost().goBack();
    }

    /**
     * Reset the backend url back to the productionready.io url
     */
    public onReset() {
        this.save(AbstractHttpService.PRODUCTIONREADY_IO_API_BASE_URL);
    }

    /**
     *
     */
    public onBack() {
        topmost().goBack();
    }

    /**
     *
     * @param url
     */
    protected save(url) {
        setString("apiUrl", url);
        this.url = url;
        this.txtUrl.nativeElement.text = url;
    }
}
