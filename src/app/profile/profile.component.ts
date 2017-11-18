import {Component, OnDestroy} from '@angular/core';
import {User} from "../api";
import {UserService} from "../user.service";
import {Subscription} from "rxjs/Subscription";
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {TITLE_SUFFIX} from "../app.component";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnDestroy {
    user: User;
    username: string;
    routeSubscription: Subscription;

    constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private title: Title) {
        this.routeSubscription = this.activatedRoute.params.subscribe(params => {
            this.username = params['username'];
            if (!this.username)
                this.userService.subscribeOnUserChange(user => {
                    this.user = user;
                    this.title.setTitle(user.username + TITLE_SUFFIX);
                });
            else
                this.userService.getUserInfo(this.username)
                    .subscribe(user => {
                            this.user = user;
                            if (!this.user)
                                this.title.setTitle("User Not Found" + TITLE_SUFFIX);
                            else
                                this.title.setTitle(this.user.username + TITLE_SUFFIX);
                        },
                        e => {
                            this.user = null;
                            this.title.setTitle("User Not Found" + TITLE_SUFFIX);
                        }
                    );
        })
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }
}