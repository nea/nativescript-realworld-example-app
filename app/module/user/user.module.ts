import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { TNSFontIconModule } from "nativescript-ngx-fonticon";
import { NativeScriptLocalizeModule } from "nativescript-localize/angular";

import { UserRouting } from "./user.routing";
import { ProfileComponent } from "./profile.component";
import { LoginComponent } from "./login.component";
import { ListArticlesComponent } from "~/module/article/list-articles.component";
import { ArticleModule } from "~/module/article/article.module";
import { ServiceModule } from "~/service/service.module";

@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptLocalizeModule,
        ServiceModule,
        ArticleModule,
        UserRouting,
        TNSFontIconModule
    ],
    declarations: [ProfileComponent, LoginComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class UserModule {}
