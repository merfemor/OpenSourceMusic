import {Injectable} from '@angular/core';
import {UserService} from "./user.service";
import {ProjectService} from "./project.service";
import {Project, User} from "./api";

@Injectable()
export class SearchService {
    constructor(private userService: UserService, private projectService: ProjectService) {
        this.userService.getAllUsers().subscribe(users => this._allUsers = users);
        this.projectService.getAllProjects().subscribe(projects => this._allProjects = projects);
    }

    private _allUsers: User[];

    get allUsers(): User[] {
        return this._allUsers;
    }

    private _allProjects: Project[];

    get allProjects(): Project[] {
        return this._allProjects;
    }
}
