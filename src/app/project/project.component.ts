import {Component, OnDestroy} from '@angular/core';
import {ProjectService} from "../project.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {Project, Role} from "../api";
import {ProjectMemberService} from "../project-member.service";
import {UserService} from "../user.service";

@Component({
    selector: 'app-project',
    templateUrl: 'project.component.html',
    styleUrls: ['project.component.sass'],
    providers: [ProjectService, ProjectMemberService, UserService]
})
export class ProjectComponent implements OnDestroy {
    private routeSubscription: Subscription;
    public project: Project;
    public isUserManager: boolean = false;
    public isUserCreator: boolean = false;

    constructor(private projectService: ProjectService,
                private activatedRoute: ActivatedRoute,
                private projectMemberService: ProjectMemberService,
                private userService: UserService) {
        this.routeSubscription = this.activatedRoute.params.subscribe(params => {
            let project_id: number = params['id'];
            this.projectService.getProjectById(project_id).subscribe(p => this.project = p);
            this.userService.onSessionLoaded(() => {
                if (!this.userService.isLogged()) {
                    this.isUserManager = false;
                    this.isUserCreator = false;
                    return;
                }
                let user = this.userService.getUser();
                this.projectMemberService.isUserHasRole(user.id, project_id, Role.MEMBER)
                    .subscribe(is => this.isUserManager = is);
                this.projectMemberService.isUserHasRole(user.id, project_id, Role.CREATOR)
                    .subscribe(is => this.isUserCreator = is);
            });
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
}