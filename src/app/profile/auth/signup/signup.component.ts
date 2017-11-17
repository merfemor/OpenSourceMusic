import {Component} from '@angular/core';
import {UserService} from "../../../user.service";
import {User} from "../../../api";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginUniqueValidator, PasswordRegexp, UsernameRegexp} from "../../../validator";

@Component({
    selector: 'app-auth',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.sass']
})
export class SignUpComponent {
    user = new User();
    form = new FormGroup({
        username: new FormControl(this.user.username, [
                Validators.required,
                Validators.pattern(UsernameRegexp)
            ],
            LoginUniqueValidator.createValidator(this.userService)
        ),
        email: new FormControl(this.user.email,
            Validators.email,
            LoginUniqueValidator.createValidator(this.userService)
        ),
        password: new FormControl(this.user.password, [
            Validators.required,
            Validators.pattern(PasswordRegexp)
        ])
    });

    constructor(private router: Router, private userService: UserService) {
    }

    submit() {
        this.user.email = this.form.get('email').value;
        this.user.username = this.form.get('username').value;
        this.user.password = this.form.get('password').value;
        this.userService.signUp(this.user, status => {
            if (status.successful) {
                this.router.navigateByUrl("/");
            } else {
                if (status.description)
                    alert(status.description);
                else
                    alert('Unknown error during authorization. Try again.');
            }
        });
    }
}
