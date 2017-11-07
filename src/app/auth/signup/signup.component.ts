import {Component} from '@angular/core';
import {UserService} from "../../user.service";
import {User} from "../../api";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-auth',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.sass'],
    providers: [UserService]
})
export class SignUpComponent {
    user = new User();
    form: FormGroup;

    constructor(private fb: FormBuilder, private userService: UserService) {
        this.form = new FormGroup({
            'username': new FormControl(this.user.username, [
                Validators.required
            ]),
            'email': new FormControl(this.user.email, [
                Validators.required,
                Validators.email
            ]),
            'password': new FormControl(this.user.password, [
                Validators.required,
                Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{9,}$')
            ])
        })
    }

    onSubmit() {
        console.log(this.form);
    }

}
