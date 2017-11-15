import {Component} from '@angular/core';
import {UserService} from "../../../user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthorizationStatus} from "../../../api";

@Component({
    selector: 'app-auth',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.sass']
})
export class SignInComponent {
    form = new FormGroup({
        'login': new FormControl(null, [
            Validators.required
        ]),
        'password': new FormControl(null, [
            Validators.required
        ])
    });
    authStatus: AuthorizationStatus = null;

    constructor(private router: Router, private userService: UserService) {
    }

    singIn() {
        let login = this.form.get('login').value;
        let password = this.form.get('password').value;
        this.userService.signIn(login, password).subscribe(status => {
            if (status.successful)
                this.router.navigateByUrl("/");
            else
                this.authStatus = status;
        });
    }
}
