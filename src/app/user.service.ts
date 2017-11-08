import {Injectable} from '@angular/core';
import {AuthorizationStatus, User} from "./api";

@Injectable()
export class UserService {
    private user: User = UserService.returnTestUser();

    public static returnTestUser(): User {
        return {
            username: 'lenon',
            email: 'lenon@beatles.the',
            firstName: 'John',
            lastName: 'Lenon',
            password: '1234567aA'
        };
    }

    public static isEmailExists(email: string): boolean {
        return false;
    }

    public static isUsernameExists(username: string): boolean {
        return false;
    }

    public signUp(user: User): boolean {
        this.user = user;
        return false;
    }

    public signIn(username_or_email: string, password: string): AuthorizationStatus {
        let user = new User();
        if (UserService.isEmailExists(username_or_email)) {
            user.email = username_or_email;
        } else if (UserService.isUsernameExists(username_or_email)) {
            user.username = username_or_email;
        } else {
            return {
                successful: false,
                description: 'Incorrect username or email'
            }
        }
        user.password = password;
        this.user = user;

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
