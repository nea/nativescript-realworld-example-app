import { Component, ViewChild, ElementRef } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { Page } from "tns-core-modules/ui/page/page";
import { Article } from "~/model/Article";
import { TextField } from "ui/text-field";
import { ConduitService } from "~/service/ConduitService";

@Component({
    selector: "conduit-write-comment-modal",
    moduleId: module.id,
    templateUrl: "./write-comment-modal.component.html",
    styleUrls: ["./comment.css"]
})
export class WriteCommentModal {
    /** */
    public article: Article;
    /** */
    public isLoading: boolean = false;
    /** */
    @ViewChild("txtComment") protected txtComment: ElementRef;

    /**
     *
     * @param params
     * @param page
     * @param conduit
     */
    public constructor(private params: ModalDialogParams, private page: Page, protected conduit: ConduitService) {
        this.article = params.context;
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
     */
    public onSubmit() {
        this.isLoading = true;
        let commentField = <TextField>this.txtComment.nativeElement;
        this.conduit.addComment(this.article.slug, commentField.text).subscribe(() => {
            this.params.closeCallback(commentField.text);
        }).add(() => {
            this.isLoading = false;
        });
    }
}
