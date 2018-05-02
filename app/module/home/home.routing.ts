import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home.component";

// prettier-ignore
const HomeRoutes: Routes = [
    { path: "home", component: HomeComponent }
];

export const HomeRouting: ModuleWithProviders = RouterModule.forChild(HomeRoutes);
