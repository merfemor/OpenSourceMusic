import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {API_URL_ROOT, Project, RequestStatus, Role} from "./api";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {UserService} from "./user.service";
import {of} from "rxjs/observable/of";
import {ProjectMemberService} from "./project-member.service";

@Injectable()
export class ProjectService {
    constructor(private http: HttpClient,
                private userService: UserService,
                private projectMemberService: ProjectMemberService) {
    }

    public getProjects(userId: number, madeByUser = true): Observable<Project[]> {
        return this.http.get<Project[]>(API_URL_ROOT + "projects", {
            params: new HttpParams()
                .set("madeByUser", String(madeByUser))
                .set("madeById", userId.toString())
        });
    }

    public getProjectById(projectId: number): Observable<Project> {
        return this.http.get<Project[]>(API_URL_ROOT + "projects", {
            params: new HttpParams().set("id", projectId.toString())
        }).map(ps => ps[0]);
    }

    public createProject(project: Project): Observable<RequestStatus> {
        if (!this.userService.isLogged())
            return of({successful: false, description: "User not authorized"});
        project.madeByUser = true;
        project.madeById = this.userService.getUser().id;
        project.isEmpty = true;
        project.creationDate = Date.now();

        return this.http.post<Project>(API_URL_ROOT + "projects", project, {
            headers: new HttpHeaders().set("Content-Type", "application/json")
        }).map(project => {
            if (!project)
                return {successful: false, description: "Unknown error"};
            this.projectMemberService.addMember(
                project.id,
                this.userService.getUser(),
                Role.CREATOR
            ).subscribe((a) => {
            });

            return {successful: true};
        });
    }
}
