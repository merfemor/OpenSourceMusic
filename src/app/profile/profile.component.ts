import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
    user = new User("sample_nickname");

    constructor() {
    }

    ngOnInit() {
    }

}


export class User {
    public nickname: string;

    constructor(nickname) {
        this.nickname = nickname;
    }
}