import {AbstractControl, ValidationErrors} from "@angular/forms";
import {UserService} from "./user.service";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';

export class LoginUniqueValidator {

    public static createValidator(userService: UserService): ((c: AbstractControl) => Observable<ValidationErrors>) {
        return (c: AbstractControl) => {
            return userService.isLoginExists(c.value).map(exists =>
                exists ? {isLoginUnique: {}} : null
            );
        };
    }
}