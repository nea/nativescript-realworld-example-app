import { Injectable } from "@angular/core";
import { Observable as RxObservable } from "rxjs";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { setString } from "application-settings";
import { ConduitService } from "~/service/ConduitService";

/**
 *
 */
@Injectable()
export class AuthenticationService {
    /**
     *
     * @param http
     * @param conduit
     */
    constructor(private http: HttpClient, private conduit: ConduitService) {}
}
