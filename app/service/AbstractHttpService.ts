import { Observable as RxObservable } from "rxjs/Observable";
import "rxjs/add/observable/throw";
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { getString, setString } from "application-settings";
import { UserService } from "~/service/UserService";
import { ConduitService } from "~/service/ConduitService";

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
        return this.http.get(AbstractHttpService.ApiUrl + urlSuffix, { headers: ConduitService.Headers, params });
    }

    /**
     *
     * @param urlSuffix
     * @param body
     */
    protected post(urlSuffix, body = {}): RxObservable<Object> {
        return this.http.post(AbstractHttpService.ApiUrl + urlSuffix, body, { headers: ConduitService.Headers });
    }

    /**
     *
     * @param urlSuffix
     * @param body
     */
    protected put(urlSuffix, body = {}): RxObservable<Object> {
        return this.http.put(AbstractHttpService.ApiUrl + urlSuffix, body, { headers: ConduitService.Headers });
    }

    /**
     *
     * @param urlSuffix
     */
    protected delete(urlSuffix): RxObservable<Object> {
        return this.http.delete(AbstractHttpService.ApiUrl + urlSuffix, { headers: ConduitService.Headers });
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
}
