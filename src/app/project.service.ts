import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {API_URL_ROOT, Project, Role} from "./api";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {UserService} from "./user.service";
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

    public createProject(project: Project): Observable<Project> {
        if (!this.userService.isLogged())
            return null;
        project.madeByUser = true;
        project.madeById = this.userService.getUser().id;
        project.isEmpty = true;
        project.creationDate = Date.now();

        return this.http.post<Project>(API_URL_ROOT + "projects", project, {
            headers: new HttpHeaders().set("Content-Type", "application/json")
        }).map(project => {
            if (project) {
                this.projectMemberService.addMember(
                    project.id,
                    this.userService.getUser(),
                    Role.CREATOR
                ).subscribe(() => {
                });
            }
            return project;
        });
    }

    public changeProjectTitle(projectId: number, newTitle: string): Observable<Project> {
        return this.http.patch<Project>(API_URL_ROOT + "projects/" + projectId,
            {title: newTitle}, {
                headers: new HttpHeaders().set("Content-Type", "application/json")
            });
    }

    public changeProjectDescription(projectId: number, newDescription: string): Observable<Project> {
        return this.http.patch<Project>(API_URL_ROOT + "projects/" + projectId,
            {description: newDescription}, {
                headers: new HttpHeaders().set("Content-Type", "application/json")
            });
    }

    public deleteProject(projectId: number) {
        return this.http.delete(API_URL_ROOT + "projects/" + projectId);
    }

    public getAllProjects(): Observable<Project[]> {
        return this.http.get(API_URL_ROOT + "projects");
    }
}
