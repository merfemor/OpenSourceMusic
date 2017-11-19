import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {API_URL_ROOT, Project, RequestStatus} from "./api";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable()
export class ProjectService {
    constructor(private http: HttpClient) {
    }

    public getProjects(userId: number, madeByUser = true): Observable<Project[]> {
        return this.http.get<Project[]>(API_URL_ROOT + "projects", {
            params: new HttpParams()
                .set("madeByUser", String(madeByUser))
                .set("madeById", userId.toString())
        });
    }

    public createProject(project: Project): Observable<RequestStatus> {
        return this.http.post<Project>(API_URL_ROOT + "projects", project, {
            headers: new HttpHeaders().set("Content-Type", "application/json")
        }).map(project => project ?
            {successful: true} :
            {successful: false, description: "Unknown error"});
    }
}
