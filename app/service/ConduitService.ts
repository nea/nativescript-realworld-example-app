import { Injectable } from "@angular/core";
import { Observable as RxObservable } from "rxjs";
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from "@angular/common/http";
import { getString } from "application-settings";

/**
 *
 */
@Injectable()
export class ConduitService {
    /**
     * Default online URL in case no other is given
     */
    private baseApiUrl: string = "https://conduit.productionready.io/api";

    /**
     *
     * @param http
     */
    constructor(private http: HttpClient) {}

    /**
     * Filter by tag: `?tag=AngularJS`
     * Filter by author: `?author=jake`
     * Favorited by user: `?favorited=jake`
     * Limit number of articles (default is 20): `?limit=20`
     * Offset/skip number of articles (default is 0): `?offset=0`
     */
    public getArticles(tag: string = "", author: string = "", favorited: string = "", limit: number = 20, offset: number = 0) {
        return this.http.get(this.getApiUrl() + "/articles", {
            headers: this.getHeader(),
            params: {
                tag,
                author,
                favorited,
                limit: limit.toString(),
                offset: offset.toString()
            }
        });
    }

    /**
     *
     */
    public getApiUrl() {
        return getString("apiUrl", this.baseApiUrl);
    }

    /**
     *
     */
    public getHeader() {
        let headers: HttpHeaders = new HttpHeaders({
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/json; charset=utf-8"
        });
        let token: string = getString("token");
        if (token !== null && token !== "") {
            headers.append("Authorization", "Token ${token}");
        }
        return headers;
    }
}
