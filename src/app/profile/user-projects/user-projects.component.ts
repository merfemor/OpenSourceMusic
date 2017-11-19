import {Component} from '@angular/core';
import {ProjectService} from "../../project.service";

@Component({
    selector: 'app-user-projects',
    templateUrl: 'user-projects.component.html',
    styleUrls: ['user-projects.component.sass'],
    providers: [ProjectService]
})
export class UserProjectsComponent {
    constructor(private projectService: ProjectService) {
    }
}
