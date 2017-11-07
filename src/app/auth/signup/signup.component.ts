import {Component} from '@angular/core';
import {UserService} from "../../user.service";
import {User} from "../../api";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
    selector: 'app-auth',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.sass'],
    providers: [UserService]
})
export class SignUpComponent {
    user = new User();
    form: FormGroup;

    constructor(private router: Router, private fb: FormBuilder, private userService: UserService) {
        this.form = new FormGroup({
            'username': new FormControl(this.user.username, [
                Validators.required
            ]),
            'email': new FormControl(this.user.email, [
                Validators.email
            ]),
            'password': new FormControl(this.user.password, [
                Validators.required,
                Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{9,}$')
            ])
        })
    }

    onSubmit() {
        this.user.email = this.form.get('email').value;
        this.user.username = this.form.get('username').value;
        this.user.password = this.form.get('password').value;
        if (this.userService.signUp(this.user)) {
            this.router.navigateByUrl("/");
        } else {
            alert('Unknown error during authorization. Try again.');
        }
    }
}
