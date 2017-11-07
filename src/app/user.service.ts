import {Injectable} from '@angular/core';
import {AuthorizationStatus, User} from "./api";

@Injectable()
export class UserService {
    private user: User;

    public static isEmailExists(email: string): boolean {
        return false;
    }

    public static isUsernameExists(username: string): boolean {
        return false;
    }

    public signUp(user: User): boolean {
        this.user = user;
        return false; // unsuccessful
    }

    public signIn(username_or_email: string, password: string): AuthorizationStatus {
        this.user = new User();
        if (UserService.isEmailExists(username_or_email)) {
            this.user.email = username_or_email;
        } else if (UserService.isUsernameExists(username_or_email)) {
            this.user.username = username_or_email;
        } else {
            return {
                successful: false,
                description: 'Incorrect username or email'
            }
        }

        return {
            successful: false,
            description: 'Unknown error'
        }

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
