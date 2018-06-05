import { Injectable } from "@angular/core";
import { Observable as RxObservable } from "rxjs";
import { tap, map, catchError } from "rxjs/operators";
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { setString, getString } from "application-settings";
import { User } from "~/model/User";
import { AbstractHttpService } from "~/service/AbstractHttpService";
import { Profile } from "~/model/Profile";
import { localize } from "nativescript-localize";

/**
 *
 */
@Injectable()
export class UserService extends AbstractHttpService {
    /** */
    private user: User;

    /**
     *
     * @param http
     */
    constructor(protected http: HttpClient) {
        super(http);
    }

    /**
     *
     * @param email
     * @param password
     */
    public login(email: string, password: string) {
        return this.pipeUser(
            this.post("/users/login", {
                user: {
                    email,
                    password
                }
            })
        );
    }

    /**
     *
     */
    public logout() {
        UserService.Token = "";
        this.user = null;
        return true;
    }

    /**
     *
     * @param username
     * @param email
     * @param password
     */
    public register(username: string, email: string, password: string) {
        return this.pipeUser(
            this.post("/users", {
                user: {
                    username,
                    email,
                    password
                }
            })
        );
    }

    /**
     *
     */
    public getUser() {
        return this.user;
    }

    /**
     *
     */
    protected set User(user: User) {
        UserService.Token = user.token;
        this.user = user;
    }

    /**
     *
     */
    public getCurrentUser() {
        if (!UserService.IsLoggedIn()) {
            return RxObservable.throw(localize("error.login"));
        }
        return this.pipeUser(this.get("/user"));
    }

    /**
     *
     * @param user The updated user object
     */
    public updateUser(user: User) {
        if (!UserService.IsLoggedIn()) {
            return RxObservable.throw(localize("error.login"));
        }
        return this.pipeUser(
            this.put("/user", {
                user: {
                    email: user.email,
                    username: user.username,
                    image: user.image,
                    bio: user.bio
                }
            })
        );
    }

    /**
     *
     * @param password
     */
    public updatePassword(password: string) {
        if (!UserService.IsLoggedIn()) {
            return RxObservable.throw(localize("error.login"));
        }
        return this.pipeUser(
            this.put("/user", {
                user: {
                    password
                }
            })
        );
    }

    /**
     *
     * @param observable
     */
    protected pipeUser(observable: RxObservable<Object>): RxObservable<Object> {
        return observable.pipe(map((data: any) => data.user), tap((user: User) => (this.User = user)), catchError(this.handleError));
    }

    /**
     *
     * @param username
     */
    public getProfile(username: string) {
        return this.get(`/profiles/${username}`).pipe(map((data: any) => data.profile), catchError(this.handleError));
    }

    /**
     *
     * @param username
     * @param follow true if to follow, false if to unfollow
     */
    public followUser(username: string, follow: boolean = true) {
        if (!UserService.IsLoggedIn()) {
            return RxObservable.throw(localize("error.login"));
        }
        let url: string = `/profiles/${username}/follow`;
        let request;
        if (follow) {
            request = this.post(url);
        } else {
            request = this.delete(url);
        }
        return request.pipe(map((data: any) => data.profile), catchError(this.handleError));
    }

    /**
     *
     */
    public static IsLoggedIn(): boolean {
        return !!getString("token");
    }

    /**
     *
     */
    public static get Token(): string {
        return getString("token", null);
    }

    /**
     *
     */
    public static set Token(token: string) {
        setString("token", token);
    }
}
