import {Injectable} from '@angular/core';
import {API_URL_ROOT, RequestStatus, User} from "./api";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Rx";
import {CookieService} from "ngx-cookie-service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Subscription} from "rxjs/Subscription";
import {AsyncSubject} from "rxjs/AsyncSubject";

@Injectable()
export class UserService {
    private userChanges: BehaviorSubject<User> = new BehaviorSubject(null);
    private sessionLoadStatus: AsyncSubject<boolean> = new AsyncSubject();

    constructor(private http: HttpClient, private cookieService: CookieService) {
        this.restoreSessionFromCookies();
    }

    public getUser(): User {
        if (!this.userChanges)
            throw new Error("User change stream has not yet been created");
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
            return {successful: false, description: 'Incorrect username or password'};
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
        if (user.profileImageUrl == null)
            user.profileImageUrl = "http://res.cloudinary.com/osm/image/upload/v1511617709/No-Avatar-High-Definition_ulzhtc.jpg";


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

    public changeProfileImage(profileImageUrl: string): Observable<RequestStatus> {
        let user = this.getUser();
        user.profileImageUrl = profileImageUrl;
        return this.updateProfile(user);
    }

    private saveSessionInCookies(): void {
        this.cookieService.set("id", this.getUser().id.toString(), 30, "/");
        this.cookieService.set("pass", this.getUser().password, 30, "/");
    }

    private clearCookies() {
        this.cookieService.set("id", "", 30, "/");
        this.cookieService.set("pass", "", 30, "/");
        console.log("Cookies deleted");
    }

    public isLogged(): boolean {
        return this.getUser() != null;
    }

    public subscribeOnUserChange(onChange: (u: User) => void): Subscription {
        return this.userChanges.subscribe(onChange);
    }

    public onSessionLoaded(onLoaded: () => void): void {
        let subscription = this.sessionLoadStatus.subscribe(u => {
            onLoaded();
            if (subscription)
                subscription.unsubscribe();
        });
        if (!subscription)
            onLoaded();
    }

    private setUser(u: User) {
        if (!this.userChanges)
            this.userChanges = new BehaviorSubject(u);
        else
            this.userChanges.next(u);
    }

    public getUserInfo(username: string): Observable<User> {
        return this.http.get<User[]>(API_URL_ROOT + "users", {
            params: new HttpParams().set("username", username)
        }).map(users => users.length != 0 ? users[0] : null);
    }

    private restoreSessionFromCookies(): User {
        let id = this.cookieService.get("id");
        let password = this.cookieService.get("pass");

        if (!id || !password) {
            console.log("Failed to restore session from cookies: cookies not set");
            this.setUser(null);
            this.sessionLoadStatus.next(true);
            this.sessionLoadStatus.complete();
            return;
        }
        this.http.get<User>(API_URL_ROOT + "users/" + id.toString())
            .subscribe(user => {
                if (!user || user.password != password) {
                    console.log("Failed to restore session from cookies: bad cookie values");
                    this.clearCookies();
                    this.setUser(null);
                } else
                    this.setUser(user);
            }, e => {
                this.setUser(null);
            }, () => {
                this.sessionLoadStatus.next(true);
                this.sessionLoadStatus.complete();
            });

    }

    public getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(API_URL_ROOT + "users");
    }
}
