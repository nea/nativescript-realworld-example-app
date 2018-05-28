import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProfileComponent } from "./profile.component";
import { LoginComponent } from "./login.component";
import { EditProfileComponent } from "~/module/user/edit-profile.component";

// prettier-ignore
const UserRoutes: Routes = [
    { path: 'profile/:username', component: ProfileComponent },
    { path: 'user/settings', component: EditProfileComponent },
    { path: 'login', component: LoginComponent }
];

export const UserRouting: ModuleWithProviders = RouterModule.forChild(UserRoutes);
