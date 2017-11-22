import {Component, OnDestroy} from '@angular/core';
import {ProjectService} from "../project.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {Project} from "../api";

@Component({
    selector: 'app-project',
    templateUrl: 'project.component.html',
    styleUrls: ['project.component.sass'],
    providers: [ProjectService]
})
export class ProjectComponent implements OnDestroy {
    private routeSubscription: Subscription;
    public project: Project;

    constructor(private projectService: ProjectService, private activatedRoute: ActivatedRoute) {
        this.routeSubscription = this.activatedRoute.params.subscribe(params => {
            let project_id: number = params['id'];
            this.projectService.getProjectById(project_id).subscribe(p => {
                this.project = p;
                console.log(p);
            });
        })
    }

    ngOnDestroy(): void {
        this.routeSubscription.unsubscribe();
    }
}