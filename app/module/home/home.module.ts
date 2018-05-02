import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { HomeRouting } from "./home.routing";
import { HomeComponent } from "./home.component";

@NgModule({
    imports: [
        NativeScriptModule,
        HomeRouting
    ],
    declarations: [HomeComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class HomeModule {}
