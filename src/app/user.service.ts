import {Injectable} from '@angular/core';
import {API_URL_ROOT, RequestStatus, User} from "./api";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import {CookieService} from "ngx-cookie-service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class UserService {
    private userChanges: BehaviorSubject<User> = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient, private cookieService: CookieService) {
        this.restoreSessionFromCookies();
        this.setUser(null);
    }

    public getUser(): User {
        return this.userChanges.getValue();
    }

    public signIn(login: string, password: string): Observable<RequestStatus> {
        return this.http.get<User[]>(API_URL_ROOT + "users", {
            params: new HttpParams()
                .set("password", password)
        }).map(data => {
            let u: User = data.filter(u => u.username == login || u.email == login).pop();
            if (u) {
                this.setUser(u);
                this.saveSessionInCookies();
                return {successful: true};
            }
            return {successful: false, description: 'Incorrect login or password'};
        });
    }

    public isLoginExists(login: string): Observable<boolean> {
        return this.http.get<User[]>(API_URL_ROOT + "users", {
            params: new HttpParams().set('username', login)
        }).map(data => data.length != 0);
    }

    public signUp(user: User, callback: (status: RequestStatus) => any): void {
        let unsuccessful = {
            successful: false,
            description: "Such a nickname or email has already been registered"
        };

        if (user.firstName == null)
            user.firstName = "";
        if (user.lastName == null)
            user.lastName = "";


        this.isLoginExists(user.email).subscribe(exists => {
            if (exists) {
                callback(unsuccessful);
                return;
            }
            this.isLoginExists(user.username).subscribe(exists => {
                if (exists) {
                    callback(unsuccessful);
                    return;
                }
                let req = this.http.post<User>(API_URL_ROOT + "users", user, {
                    headers: new HttpHeaders().set("Content-Type", "application/json")
                });
                req.subscribe(user => {
                    callback({
                        successful: true
                    })
                });
            });
        });
    }

    public logOut(): void {
        this.clearCookies();
        this.setUser(null);
    }

    public updateProfile(user: User): Observable<RequestStatus> {
        return this.http.patch<User>(API_URL_ROOT + "users/" + user.id, user, {
            headers: new HttpHeaders().set("Content-Type", "application/json")
        }).map(u => {
            if (u) {
                console.log("set: " + u);
                this.setUser(u);
                return {successful: true};
            } else {
                return {
                    successful: false,
                    description: "Unknown error"
                };
            }
        });
    }

    public changePassword(oldPassword: string, newPassword: string): Observable<RequestStatus> {
        return this.http.get<User[]>(API_URL_ROOT + "users", {
            params: new HttpParams().set("id", this.getUser().id.toString())
        }).map(users => {
            if (users.length == 0) {
                return {successful: false, description: "Failed to get current user info"};
            }
            return users[0].password === oldPassword ?
                {successful: true} :
                {successful: false, description: "Incorrect password"}
        }).map(status => {
            if (status.successful) {
                let user = this.getUser();
                user.password = newPassword;
                this.updateProfile(user).subscribe(status => {
                    if (status.successful)
                        this.saveSessionInCookies();
                });
            }
            return status;
        });
    }

    private saveSessionInCookies(): void {
        this.cookieService.set("id", this.getUser().id.toString(), 30, "/");
        this.cookieService.set("pass", this.getUser().password);
    }

    private clearCookies() {
        this.cookieService.delete("id");
        this.cookieService.delete("pass");
    }

    public isLogged(): boolean {
        return this.getUser() != null;
    }

    public subscribeOnUserChange(onChange: (u: User) => void) {
        this.userChanges.subscribe(onChange);
    }

    private setUser(u: User) {
        this.userChanges.next(u);
    }

    private restoreSessionFromCookies(): User {
        let id = this.cookieService.get("id");
        let password = this.cookieService.get("pass");

        if (!id || !password) {
            console.log("Failed to restore session from cookies: cookies not set");
            return;
        }
        this.http.get<User[]>(API_URL_ROOT + "users", {
            params: new HttpParams()
                .set("id", id)
                .set("password", password)
        }).subscribe(data => {
            if (data.length != 1) {
                console.log("Failed to restore session from cookies: bad cookie values");
                this.clearCookies();
                return;
            }
            this.setUser(data[0]);
        });

    }
}
