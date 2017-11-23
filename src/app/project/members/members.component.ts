import {Component} from '@angular/core';
import {ProjectMember} from "../../api";

@Component({
    selector: 'app-members',
    templateUrl: './members.component.html',
    styleUrls: ['./members.component.sass']
})
export class MembersComponent {
    public members: ProjectMember[] = [];

    constructor() {
    }


}
