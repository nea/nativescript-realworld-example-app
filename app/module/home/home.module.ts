import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { TNSFontIconModule } from "nativescript-ngx-fonticon";

import { HomeRouting } from "./home.routing";
import { HomeComponent } from "./home.component";
import { NativeScriptLocalizeModule } from "nativescript-localize/angular";
import { ArticleModule } from "~/module/article/article.module";
import { UserModule } from "~/module/user/user.module";
import { ListArticlesComponent } from "~/module/article/list-articles.component";
import { ServiceModule } from "~/service/service.module";

@NgModule({
    imports: [
        NativeScriptModule,
        HomeRouting,
        NativeScriptLocalizeModule,
        ServiceModule,
        ArticleModule,
        UserModule,
        TNSFontIconModule
    ],
    declarations: [HomeComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class HomeModule {}
