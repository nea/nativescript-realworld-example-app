import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { TNSFontIconModule } from "nativescript-ngx-fonticon";
import { NativeScriptLocalizeModule } from "nativescript-localize/angular";
import { CommentRouting } from "./comment.routing";
import { ListCommentsComponent } from "~/module/comment/list-comments.component";
import { ServiceModule } from "~/service/service.module";
import { WriteCommentModal } from "~/module/comment/write-comment-modal.component";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";

@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptLocalizeModule,
        NativeScriptUIListViewModule,
        ServiceModule,
        CommentRouting,
        TNSFontIconModule
    ],
    declarations: [ListCommentsComponent, WriteCommentModal],
    entryComponents: [ListCommentsComponent, WriteCommentModal],
    exports: [ListCommentsComponent, WriteCommentModal],
    schemas: [NO_ERRORS_SCHEMA]
})
export class CommentModule {}
