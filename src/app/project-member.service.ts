import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {API_URL_ROOT, ProjectMember, User} from "./api";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable()
export class ProjectMemberService {
    constructor(private http: HttpClient) {
    }

    public getAllMembersOfProject(projectId: number): Observable<ProjectMember[]> {
        return this.http.get<ProjectMember[]>(API_URL_ROOT + "members", {
            params: new HttpParams().set("projectId", projectId.toString())
        });
    }

    public addMember(project_id: number, user: User, role: number): Observable<ProjectMember> {
        let pm: ProjectMember = {
            projectId: project_id,
            user: user,
            role: role
        };
        return this.http.post(API_URL_ROOT + "members", pm, {
            headers: new HttpHeaders().set("Content-Type", "application/json")
        });
    }

    public removeMember(member: ProjectMember) {
        return this.http.delete(API_URL_ROOT + "members/" + member.id);
    }
}
