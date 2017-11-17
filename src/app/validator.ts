import {AbstractControl, ValidationErrors} from "@angular/forms";
import {UserService} from "./user.service";
import {Observable} from "rxjs/Observable";
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/map';

export const UsernameRegexp = '^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+$';
export const PasswordRegexp = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{9,}$';

export class LoginUniqueValidator {

    public static createValidator(userService: UserService): ((c: AbstractControl) => Observable<ValidationErrors>) {
        return (c: AbstractControl) => {
            return userService.isLoginExists(c.value).map(exists =>
                exists ? {isLoginUnique: {}} : null
            );
        };
    }
}

export class LoginChangedOrUniqueValidator {

    public static createValidator(userService: UserService, initName: string): ((c: AbstractControl) => Observable<ValidationErrors>) {
        return (c: AbstractControl) => {
            if (c.value == initName) {
                return of(null);
            }
            return userService.isLoginExists(c.value).map(exists =>
                exists ? {isLoginUnique: {}} : null
            );
        };
    }
}