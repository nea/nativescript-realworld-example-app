import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home.component";
import { SettingsComponent } from "./settings.component";

// prettier-ignore
const HomeRoutes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "settings", component: SettingsComponent }
];

export const HomeRouting: ModuleWithProviders = RouterModule.forChild(HomeRoutes);
