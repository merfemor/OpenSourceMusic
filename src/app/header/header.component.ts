import {Component} from '@angular/core';
import {UserService} from "../user.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.sass']
})
export class HeaderComponent {
    public sanitizeUrl = (url) =>
        this.sanitizer.bypassSecurityTrustStyle('url("' + url + '")');

    constructor(public userService: UserService, private sanitizer: DomSanitizer) {
    }
}
