import { Component } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";

@Component({
    selector: "conduit-write-comment-modal",
    moduleId: module.id,
    templateUrl: "./write-comment-modal.component.html",
    styleUrls: ["./comment.css"]
})
export class WriteCommentModal {
    public frameworks: Array<string>;

    public constructor(private params: ModalDialogParams) {
        this.frameworks = ["NativeScript", "Xamarin", "Onsen UI", "Ionic Framework", "React Native"];
    }

    public close(res: string) {
        this.params.closeCallback(res);
    }
}
