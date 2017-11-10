import {Component} from '@angular/core';
import {User} from "../api";
import {UserService} from "../user.service";
import {FormControl} from "@angular/forms";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.sass']
})
export class ProfileComponent {
    user: User = this.userService.getUser();

    constructor(private userService: UserService) {
    }

    /**
     * used in forms for validating login (which may be username or email) field
     * @param {FormControl} c
     * @returns {{isUnique: {valid: boolean}}}
     */
    public static isLoginUnique(c: FormControl) {
        return UserService.isLoginExists(c.value) ? {
            isUnique: {
                valid: false
            }
        } : null;
    }
}