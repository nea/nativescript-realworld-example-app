import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { TNSFontIconModule } from "nativescript-ngx-fonticon";
import { NativeScriptLocalizeModule } from "nativescript-localize/angular";
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";

import { UserRouting } from "./user.routing";

import { ArticleModule } from "~/module/article/article.module";
import { ServiceModule } from "~/service/service.module";

import { ProfileComponent } from "./profile.component";
import { LoginComponent } from "./login.component";
import { EditProfileComponent } from "~/module/user/edit-profile.component";

@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptLocalizeModule,
        NativeScriptUIDataFormModule,
        ServiceModule,
        ArticleModule,
        UserRouting,
        TNSFontIconModule
    ],
    declarations: [ProfileComponent, LoginComponent, EditProfileComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class UserModule {}
