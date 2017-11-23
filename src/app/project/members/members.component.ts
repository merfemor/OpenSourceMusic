import {Component, Input, OnInit} from '@angular/core';
import {ProjectMember, Role, User} from "../../api";
import {ProjectMemberService} from "../../project-member.service";
import {DomSanitizer} from "@angular/platform-browser";
import {UserService} from "../../user.service";

@Component({
    selector: 'app-members',
    templateUrl: './members.component.html',
    styleUrls: ['./members.component.sass']
})
export class MembersComponent implements OnInit {
    @Input() public projectId: number;
    public members: ProjectMember[] = [];
    public Role = Role;
    public canManage: boolean = false;
    public allUsers: User[] = [];
    public searchText: string = "";
    public showAdd: boolean = false;

    public getSanitizedUserProfileImageUrl = (url) =>
        this.sanitizer.bypassSecurityTrustStyle('url("' + url + '")');

    constructor(private membersService: ProjectMemberService,
                private sanitizer: DomSanitizer,
                private userService: UserService) {
    }

    ngOnInit() {
        this.membersService.getAllMembersOfProject(this.projectId)
            .subscribe(members => {
                this.members = members;
                this.userService.subscribeOnUserChange(u => {
                    if (!u || !this.members) {
                        this.canManage = false;
                        return;
                    }
                    this.canManage = this.members.filter(pm =>
                        pm.user.id === u.id && pm.role === Role.CREATOR
                    ).length > 0;
                });
            });
        this.userService.onSessionLoaded(() => {
            this.userService.getAllUsers().subscribe(users => this.allUsers = users);
        });
    }

    public addMember(user: User) {
        let pm: ProjectMember = {
            projectId: this.projectId,
            user: user,
            role: Role.MEMBER
        };
        this.membersService.addMember(
            pm.projectId,
            pm.user,
            pm.role
        ).subscribe((rs) => {
            if (rs.successful)
                this.members.push(pm);
            else
                console.error("Failed to add member: " + rs.description);
        });
    }
}
