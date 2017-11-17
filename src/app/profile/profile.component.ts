import {Component, OnDestroy} from '@angular/core';
import {User} from "../api";
import {UserService} from "../user.service";
import {Subscription} from "rxjs/Subscription";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnDestroy {
    user: User;
    username: string;
    routeSubscription: Subscription;

    constructor(private userService: UserService, private activatedRoute: ActivatedRoute) {
        this.routeSubscription = this.activatedRoute.params.subscribe(params => {
            this.username = params['username'];
            this.userService.getUserInfo(this.username).subscribe(user => this.user = user);
        })
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }
}