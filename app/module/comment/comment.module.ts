import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";
import { TNSFontIconModule } from "nativescript-ngx-fonticon";
import { NativeScriptLocalizeModule } from "nativescript-localize/angular";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular/listview-directives";
import { CommentRouting } from "./comment.routing";
import { ListCommentsComponent } from "~/module/comment/list-comments.component";

@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptUIDataFormModule,
        NativeScriptLocalizeModule,
        NativeScriptUIListViewModule,
        CommentRouting,
        TNSFontIconModule.forRoot({
            fa: "./fonts/font-awesome.css"
        })
    ],
    declarations: [ListCommentsComponent],
    exports: [ListCommentsComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class CommentModule {}
