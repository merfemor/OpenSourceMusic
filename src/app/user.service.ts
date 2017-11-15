import {Injectable} from '@angular/core';
import {API_URL_ROOT, AuthorizationStatus, User} from "./api";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
    private user: User;

    constructor(private http: HttpClient) {
    }

    public isLoginExists(login: string): Observable<boolean> {
        return this.http.get<User[]>(API_URL_ROOT + "users", {
            params: new HttpParams().set('username', login)
        }).map(data => data.length != 0);
    }

    public signUp(user: User, callback: (status: AuthorizationStatus) => any): void {
        let unsuccessful = {
            successful: false,
            description: "Such a nickname or email has already been registered"
        };
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
                this.user = user;
                let req = this.http.post<User>(API_URL_ROOT + "users", user, {
                    headers: new HttpHeaders().set("Content-Type", "application/json")
                });
                req.subscribe(user => {
                    this.user = user;
                    callback({
                        successful: true
                    })
                });
            });
        });
    }

    public signIn(login: string, password: string): Observable<AuthorizationStatus> {
        return this.http.get<User[]>(API_URL_ROOT + "users", {
            params: new HttpParams()
                .set("password", password)
        }).map(data => {
            let founded: boolean = false;
            data.forEach(u => {
                if (u.username == login || u.email == login) {
                    founded = true;
                    this.user = u;
                }
            });
            return founded ?
                {successful: true} :
                {successful: false, description: 'Incorrect login or password'}
        });
    }

    public getUser(): User {
        return this.user;
    }

    public logOut(): boolean {
        this.user = null;
        return false; // unsuccessful
    }

    public updateProfile(user: User): User {
        this.user = user;
        return this.user;
    }

    public isLogged(): boolean {
        return this.user != null;
    }
}
