import {Component, Input, OnInit} from '@angular/core';
import {User} from "../profile.component";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {
    @Input() user: User;

    constructor() {
    }

    ngOnInit() {
    }

}
