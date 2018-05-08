import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";
import { TNSFontIconModule } from "nativescript-ngx-fonticon";
import { NativeScriptLocalizeModule } from "nativescript-localize/angular";
import { NativeScriptUIAutoCompleteTextViewModule } from "nativescript-ui-autocomplete/angular";

import { ArticleRouting } from "./article.routing";
import { ArticleComponent } from "./article.component";

@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptUIDataFormModule,
        NativeScriptLocalizeModule,
        NativeScriptUIAutoCompleteTextViewModule,
        ArticleRouting,
        TNSFontIconModule.forRoot({
            fa: "./fonts/font-awesome.css"
        })
    ],
    declarations: [ArticleComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class ArticleModule {}
