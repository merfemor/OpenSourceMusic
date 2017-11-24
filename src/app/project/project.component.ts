import {AfterViewInit, Component, OnDestroy, ViewChild} from '@angular/core';
import {ProjectService} from "../project.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {Project} from "../api";
import {MembersComponent} from "./members/members.component";

@Component({
    selector: 'app-project',
    templateUrl: 'project.component.html',
    styleUrls: ['project.component.sass'],
    providers: [ProjectService]
})
export class ProjectComponent implements OnDestroy, AfterViewInit {
    @ViewChild(MembersComponent) members: MembersComponent;
    private routeSubscription: Subscription;
    public project: Project;

    constructor(private projectService: ProjectService, private activatedRoute: ActivatedRoute) {
        this.routeSubscription = this.activatedRoute.params.subscribe(params => {
            let project_id: number = params['id'];
            this.projectService.getProjectById(project_id).subscribe(p => this.project = p);
        })
    }

    onSaveTitle() {
        this.projectService.changeProjectTitle(this.project.id, this.project.title)
            .subscribe(() => {
            });
    }

    onSaveDescription() {
        this.projectService.changeProjectDescription(this.project.id, this.project.description)
            .subscribe(() => {
            });
    }

    ngOnDestroy(): void {
        this.routeSubscription.unsubscribe();
    }

    ngAfterViewInit(): void {
        console.log('ololo');
    }
}