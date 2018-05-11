import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { TNSFontIconModule } from "nativescript-ngx-fonticon";
import { NativeScriptLocalizeModule } from "nativescript-localize/angular";

import { ProfileRouting } from "./profile.routing";
import { ProfileComponent } from "./profile.component";
import { ListArticlesComponent } from "~/module/article/list-articles.component";
import { ArticleModule } from "~/module/article/article.module";

@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptLocalizeModule,
        ArticleModule,
        ProfileRouting,
        TNSFontIconModule.forRoot({
            fa: "./fonts/font-awesome.css"
        })
    ],
    declarations: [ProfileComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class ProfileModule {}
