import {Component} from '@angular/core';
import {User} from "../../api";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../user.service";
import {LoginChangedOrUniqueValidator, UsernameRegexp} from "../../validator";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.sass']
})
export class SettingsComponent {
    user: User;
    form: FormGroup = new FormGroup({
        username: new FormControl('', Validators.required),
        email: new FormControl(),
        firstName: new FormControl(),
        lastName: new FormControl()
    });

    constructor(private userService: UserService) {
        this.userService.subscribeOnUserChange(u => {
            this.user = u;
            if (!u)
                return;
            this.form = new FormGroup({
                username: new FormControl(this.user.username,
                    [Validators.required, Validators.pattern(UsernameRegexp)],
                    LoginChangedOrUniqueValidator.createValidator(this.userService, this.user.username)
                ),
                email: new FormControl(this.user.email,
                    Validators.email,
                    LoginChangedOrUniqueValidator.createValidator(this.userService, this.user.email)
                ),
                firstName: new FormControl(this.user.firstName,
                    Validators.pattern("[a-zA-Z]*")
                ),
                lastName: new FormControl(this.user.lastName,
                    Validators.pattern("[a-zA-Z]*")
                )
            });
        });
    }

    public submit() {
        this.user.email = this.form.get('email').value;
        this.user.username = this.form.get('username').value;
        this.user.firstName = this.form.get('firstName').value;
        this.user.lastName = this.form.get('lastName').value;

        this.userService.updateProfile(this.user).subscribe(u => {
            if (!u.successful) {
                alert(u.description + "\nPlease try again");
            }
        });
    }

    public isNoChanges(): boolean {
        if (!this.user)
            return true;
        let email = this.form.get('email').value;
        let username = this.form.get('username').value;
        let firstName = this.form.get('firstName').value;
        let lastName = this.form.get('lastName').value;
        return email == this.user.email &&
            username == this.user.username &&
            firstName == this.user.firstName &&
            lastName == this.user.lastName;
    }
}
