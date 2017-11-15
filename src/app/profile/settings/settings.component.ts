import {Component, OnInit} from '@angular/core';
import {User} from "../../api";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../user.service";
import {LoginUniqueValidator} from "../../validator";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {
    user: User;
    form: FormGroup;

    constructor(private router: Router, private userService: UserService) {
    }


    ngOnInit() {
        this.user = this.userService.getUser();
        this.form = new FormGroup({
            'username': new FormControl(this.user.username,
                Validators.required,
                LoginUniqueValidator.createValidator(this.userService)
            ),
            'email': new FormControl(this.user.email,
                Validators.email,
                LoginUniqueValidator.createValidator(this.userService)
            )
        });
    }

    submit() {
        this.user.email = this.form.get('email').value;
        this.user.username = this.form.get('username').value;
        if (this.userService.updateProfile(this.user)) {
            this.router.navigateByUrl("/");
        } else {
            alert('Unknown error during updating. Try again.');
        }
    }
}
