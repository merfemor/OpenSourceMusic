import {Injectable} from '@angular/core';
import {User} from "./api";

@Injectable()
export class UserService {
    private user: User;

    constructor() {
    }

    public static isEmailExists(email: string): boolean {
        return true;
    }

    public static isNicknameExists(nickname: string): boolean {
        return true;
    }

    public signUp(user: User): boolean {
        this.user = user;
        return false; // unsuccessful
    }

    public signIn(nickname_or_email: string, password: string): User {
        this.user = new User(nickname_or_email, password);
        return null; // unsuccessful
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
}
