import { Observable as RxObservable } from "rxjs";
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { getString, setString } from "application-settings";
import { UserService } from "~/service/UserService";

/**
 *
 */
export abstract class AbstractHttpService {
    /**
     * Default online URL in case no other is given
     */
    public static PRODUCTIONREADY_IO_API_BASE_URL: string = "https://conduit.productionready.io/api";

    /**
     *
     * @param http
     */
    constructor(protected http: HttpClient) {}

    /**
     *
     * @param urlSuffix
     * @param params
     */
    protected get(urlSuffix, params = {}): RxObservable<Object> {
        return this.http.get(AbstractHttpService.ApiUrl + urlSuffix, { headers: AbstractHttpService.Headers, params });
    }

    /**
     *
     * @param urlSuffix
     * @param body
     */
    protected post(urlSuffix, body = {}): RxObservable<Object> {
        return this.http.post(AbstractHttpService.ApiUrl + urlSuffix, body, { headers: AbstractHttpService.Headers });
    }

    /**
     *
     * @param urlSuffix
     * @param body
     */
    protected put(urlSuffix, body = {}): RxObservable<Object> {
        return this.http.put(AbstractHttpService.ApiUrl + urlSuffix, body, { headers: AbstractHttpService.Headers });
    }

    /**
     *
     * @param urlSuffix
     */
    protected delete(urlSuffix): RxObservable<Object> {
        return this.http.delete(AbstractHttpService.ApiUrl + urlSuffix, { headers: AbstractHttpService.Headers });
    }

    /**
     *
     * @param error
     */
    protected handleError(error: HttpErrorResponse) {
        return RxObservable.throw(error);
    }

    /**
     *
     */
    public static get ApiUrl(): string {
        return getString("apiUrl", AbstractHttpService.PRODUCTIONREADY_IO_API_BASE_URL);
    }

    /**
     *
     */
    public static set ApiUrl(apiUrl: string) {
        setString("apiUrl", apiUrl);
    }

    /**
     *
     */
    public static get Headers(): HttpHeaders {
        let headers = {
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/json; charset=utf-8",
            "Cache-Control": "no-cache",
            "Authorization": `Token ${getString("token", "")}`
        };
        if (!!!getString("token")) {
            delete headers.Authorization;
        }
        return new HttpHeaders(headers);
    }
}
