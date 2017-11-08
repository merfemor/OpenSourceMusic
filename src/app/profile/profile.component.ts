import {Component} from '@angular/core';
import {User} from "../api";
import {UserService} from "../user.service";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.sass'],
    providers: [UserService]
})
export class ProfileComponent {
    user: User = this.userService.getUser();

    constructor(private userService: UserService) {
    }
}