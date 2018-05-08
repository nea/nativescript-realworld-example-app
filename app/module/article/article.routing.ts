import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ArticleComponent } from "./article.component";

// prettier-ignore
const ArticleRoutes: Routes = [
    { path: "article", component: ArticleComponent },
    { path: 'article/:slug', component: ArticleComponent }
];

export const ArticleRouting: ModuleWithProviders = RouterModule.forChild(ArticleRoutes);
