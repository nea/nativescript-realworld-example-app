import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProfileComponent } from "./profile.component";
import { LoginComponent } from "./login.component";

// prettier-ignore
const UserRoutes: Routes = [
    { path: 'profile/:username', component: ProfileComponent },
    { path: 'login', component: LoginComponent }
];

export const UserRouting: ModuleWithProviders = RouterModule.forChild(UserRoutes);
