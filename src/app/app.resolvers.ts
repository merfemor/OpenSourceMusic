import {Injectable} from "@angular/core";
import {UserService} from "./user.service";
import {ActivatedRouteSnapshot, Router} from "@angular/router";
import {isNumeric} from "rxjs/util/isNumeric";

@Injectable()
export class NotLoggedInResolver {
    constructor(private userService: UserService, private router: Router) {
    }

    resolve(): void {
        this.userService.onSessionLoaded(() => {
            if (!this.userService.isLogged())
                this.router.navigate(['/join']);
        });
    }
}

@Injectable()
export class LoggedInResolver {
    constructor(private userService: UserService, private router: Router) {
    }

    resolve(): void {
        this.userService.onSessionLoaded(() => {
            if (this.userService.isLogged())
                this.router.navigate(['/']);
        });
    }
}

@Injectable()
export class LoggedUserProfileResolver {
    constructor(private userService: UserService, private router: Router) {
    }

    resolve(): void {
        this.userService.onSessionLoaded(() => {
            this.router.navigate(['/profile/' + this.userService.getUser().username]);
        });
    }
}

@Injectable()
export class IdIsNotNumberResolver {
    constructor(private router: Router) {
    }

    resolve(route: ActivatedRouteSnapshot): void {
        if (!isNumeric(route.params['id']))
            this.router.navigate(['/'])
    }
}