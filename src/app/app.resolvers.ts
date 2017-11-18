import {Injectable} from "@angular/core";
import {UserService} from "./user.service";
import {Router} from "@angular/router";

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