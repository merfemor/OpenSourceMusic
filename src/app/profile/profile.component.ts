import {Component} from '@angular/core';
import {User} from "../api";
import {UserService} from "../user.service";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.sass']
})
export class ProfileComponent {
    user: User;

    constructor(private userService: UserService) {
        this.userService.subscribeOnUserChange(u => this.user = u);
    }
}