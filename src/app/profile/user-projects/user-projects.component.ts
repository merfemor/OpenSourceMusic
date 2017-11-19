import {Component} from '@angular/core';
import {ProjectService} from "../../project.service";
import {Project} from "../../api";

@Component({
    selector: 'app-user-projects',
    templateUrl: 'user-projects.component.html',
    styleUrls: ['user-projects.component.sass'],
    providers: [ProjectService]
})
export class UserProjectsComponent {
    public projects: Project[] = [];

    constructor(private projectService: ProjectService) {
    }
}
