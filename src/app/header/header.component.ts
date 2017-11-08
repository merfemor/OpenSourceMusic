import {Component} from '@angular/core';
import {UserService} from "../user.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.sass'],
    providers: [UserService]
})
export class HeaderComponent {
    constructor(public userService: UserService) {
    }
}
