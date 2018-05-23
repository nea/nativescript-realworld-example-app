import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { TNSFontIconModule } from "nativescript-ngx-fonticon";
import { NativeScriptLocalizeModule } from "nativescript-localize/angular";

import { HomeRouting } from "./home.routing";
import { HomeComponent } from "./home.component";

import { ArticleModule } from "~/module/article/article.module";
import { UserModule } from "~/module/user/user.module";
import { ServiceModule } from "~/service/service.module";

import { AboutModal } from "~/module/home/about-modal.component";
import { SettingsComponent } from "~/module/home/settings.component";

@NgModule({
    imports: [NativeScriptModule, HomeRouting, NativeScriptLocalizeModule, ServiceModule, ArticleModule, UserModule, TNSFontIconModule],
    entryComponents: [AboutModal],
    declarations: [HomeComponent, AboutModal, SettingsComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class HomeModule {}
