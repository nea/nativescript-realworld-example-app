import { Injectable } from "@angular/core";
import { Observable as RxObservable } from "rxjs/Observable";
import { tap, map, catchError } from "rxjs/operators";
import "rxjs/add/observable/throw";
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from "@angular/common/http";

import { AbstractHttpService } from "~/service/AbstractHttpService";
import { UserService } from "~/service/UserService";

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
            return RxObservable.throw("Login");
        }
        return this.get("/articles/feed", {
            limit: limit.toString(),
            offset: offset.toString()
        });
    }

    /**
     *
     */
    public static get Headers(): HttpHeaders {
        let headers: HttpHeaders = new HttpHeaders({
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/json; charset=utf-8",
            Authorization: `Token ${UserService.Token}`
        });
        if (!UserService.IsLoggedIn()) {
            headers.delete("Authorization");
        }
        return headers;
    }
}
