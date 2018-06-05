import { Injectable } from "@angular/core";
import { Observable as RxObservable } from "rxjs";
import { tap, map, catchError } from "rxjs/operators";
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from "@angular/common/http";

import { AbstractHttpService } from "~/service/AbstractHttpService";
import { UserService } from "~/service/UserService";
import { Article } from "~/model/Article";
import { localize } from "nativescript-localize";

/**
 *
 */
@Injectable()
export class ConduitService extends AbstractHttpService {
    /**
     *
     * @param http
     */
    constructor(protected http: HttpClient) {
        super(http);
    }

    /**
     * Filter by tag: `?tag=AngularJS`
     * Filter by author: `?author=jake`
     * Favorited by user: `?favorited=jake`
     * Limit number of articles (default is 20): `?limit=20`
     * Offset/skip number of articles (default is 0): `?offset=0`
     */
    public getArticles(
        tag: string = "",
        author: string = "",
        favorited: string = "",
        limit: number = 20,
        offset: number = 0
    ): RxObservable<Object> {
        return this.get("/articles", {
            tag,
            author,
            favorited,
            limit: limit.toString(),
            offset: offset.toString()
        });
    }

    /**
     * Limit number of articles (default is 20): `?limit=20`
     * Offset/skip number of articles (default is 0): `?offset=0`
     */
    public getArticlesFeed(limit: number = 20, offset: number = 0): RxObservable<Object> {
        if (!UserService.IsLoggedIn()) {
            return RxObservable.throw(localize("error.login"));
        }
        return this.get("/articles/feed", {
            limit: limit.toString(),
            offset: offset.toString()
        });
    }

    /**
     *
     * @param slug
     */
    public getArticle(slug: string): RxObservable<Object> {
        return this.get(`/articles/${slug}`).pipe(map((data: any) => data.article));
    }

    /**
     *
     * @param title
     * @param description
     * @param body
     * @param tags
     */
    public addArticle(title: string, description: string, body: string, ...tagList: string[]): RxObservable<Object> {
        if (!UserService.IsLoggedIn()) {
            return RxObservable.throw(localize("error.login"));
        }
        let article: Article = {
            title,
            description,
            body,
            tagList
        };
        return this.post("/articles", JSON.stringify(article));
    }

    /**
     *
     * @param article
     */
    public setArticle(article: Article): RxObservable<Object> {
        if (!UserService.IsLoggedIn()) {
            return RxObservable.throw(localize("error.login"));
        }
        return this.put(`/articles/${article.slug}`, JSON.stringify(article));
    }

    /**
     *
     * @param slug
     */
    public removeArticle(slug: string): RxObservable<Object> {
        if (!UserService.IsLoggedIn()) {
            return RxObservable.throw(localize("error.login"));
        }
        return this.delete(`/articles/${slug}`);
    }

    /**
     *
     * @param slug
     * @param favor
     */
    public favorArticle(slug: string, favor: boolean = true): RxObservable<Object> {
        if (!UserService.IsLoggedIn()) {
            return RxObservable.throw(localize("error.login"));
        }
        if (favor) {
            return this.post(`/articles/${slug}/favorite`).pipe(map((data: any) => data.article));
        } else {
            return this.delete(`/articles/${slug}/favorite`).pipe(map((data: any) => data.article));
        }
    }

    /**
     *
     * @param slug
     * @param body
     */
    public addComment(slug: string, body: string): RxObservable<Object> {
        if (!UserService.IsLoggedIn()) {
            return RxObservable.throw(localize("error.login"));
        }
        return this.post(`/articles/${slug}/comments`, { body });
    }

    /**
     *
     * @param slug
     */
    public getComments(slug: string): RxObservable<Object> {
        return this.get(`/articles/${slug}/comments`).pipe(map((data: any) => data.comments));
    }

    /**
     *
     */
    public deleteComment(slug: string, commentId: number): RxObservable<Object> {
        if (!UserService.IsLoggedIn()) {
            return RxObservable.throw(localize("error.login"));
        }
        return this.delete(`/articles/${slug}/comments/${commentId}`);
    }

    /**
     *
     */
    public getTags(): RxObservable<Object> {
        return this.get("/tags").pipe(map((data: any) => data.tags), catchError(this.handleError));
    }
}
