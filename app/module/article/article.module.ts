import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";
import { TNSFontIconModule } from "nativescript-ngx-fonticon";
import { NativeScriptLocalizeModule } from "nativescript-localize/angular";
import { NativeScriptUIAutoCompleteTextViewModule } from "nativescript-ui-autocomplete/angular";

import { ArticleRouting } from "./article.routing";
import { EditArticleComponent } from "./edit-article.component";
import { ListArticlesComponent } from "~/module/article/list-articles.component";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular/listview-directives";
import { ViewArticleComponent } from "~/module/article/view-article.component";
import { CommentModule } from "~/module/comment/comment.module";
import { ServiceModule } from "~/service/service.module";

@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptUIDataFormModule,
        NativeScriptLocalizeModule,
        NativeScriptUIAutoCompleteTextViewModule,
        NativeScriptUIListViewModule,
        ServiceModule,
        CommentModule,
        ArticleRouting,
        TNSFontIconModule
    ],
    declarations: [ListArticlesComponent, EditArticleComponent, ViewArticleComponent],
    exports: [ListArticlesComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class ArticleModule {}
