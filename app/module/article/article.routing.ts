import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { EditArticleComponent } from "./edit-article.component";
import { ViewArticleComponent } from "~/module/article/view-article.component";

// prettier-ignore
const ArticleRoutes: Routes = [
    { path: "editor", component: EditArticleComponent },
    { path: 'editor/:slug', component: EditArticleComponent },
    { path: 'article/:slug', component: ViewArticleComponent }
];

export const ArticleRouting: ModuleWithProviders = RouterModule.forChild(ArticleRoutes);
