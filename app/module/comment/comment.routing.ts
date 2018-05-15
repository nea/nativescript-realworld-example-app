import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListCommentsComponent } from "~/module/comment/list-comments.component";

// prettier-ignore
const CommentRoutes: Routes = [
    { path: 'articles/:slug/comments', component: ListCommentsComponent }
];

export const CommentRouting: ModuleWithProviders = RouterModule.forChild(CommentRoutes);
