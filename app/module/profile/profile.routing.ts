import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProfileComponent } from "./profile.component";

// prettier-ignore
const ProfileRoutes: Routes = [
    { path: 'profile/:username', component: ProfileComponent }
];

export const ProfileRouting: ModuleWithProviders = RouterModule.forChild(ProfileRoutes);
