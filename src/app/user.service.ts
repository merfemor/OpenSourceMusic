import {Injectable} from '@angular/core';
import {AuthorizationStatus, User} from "./api";

@Injectable()
export class UserService {
    private user: User;

    public static isEmailExists(email: string): boolean {
        return true;
    }

    public static isUsernameExists(username: string): boolean {
        return true;
    }

    public signUp(user: User): boolean {
        this.user = user;
        return false; // unsuccessful
    }

    public signIn(username_or_email: string, password: string): AuthorizationStatus {
        return {
            successful: false,
            description: 'Unknown error'
        };
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
