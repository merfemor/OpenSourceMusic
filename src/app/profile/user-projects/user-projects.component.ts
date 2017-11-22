import {Component, Input, OnInit} from '@angular/core';
import {ProjectService} from "../../project.service";
import {Project} from "../../api";

@Component({
    selector: 'app-user-projects',
    templateUrl: 'user-projects.component.html',
    styleUrls: ['user-projects.component.sass'],
    providers: [ProjectService]
})
export class UserProjectsComponent implements OnInit {
    @Input() public user_id: number;
    public projects: Project[] = [];

    constructor(private projectService: ProjectService) {
    }

    ngOnInit() {
        this.projectService.getProjects(this.user_id)
            .subscribe(projects => this.projects = projects);
    }
}
