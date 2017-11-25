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
    @Input() public isUserCreator: boolean = false;
    public members: ProjectMember[] = [];
    public Role = Role;
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
            });
        this.userService.onSessionLoaded(() => {
            this.userService.getAllUsers().subscribe(users => this.allUsers = users);
        });
    }

    public addMember(user: User) {
        this.membersService.addMember(
            this.projectId,
            user,
            Role.MEMBER
        ).subscribe((pm) => {
            if (pm)
                this.members.push(pm);
            else
                console.error("Failed to add member: " + user.username);
        });
    }

    public deleteMember(member: ProjectMember) {
        let i = this.members.indexOf(member);
        if (i < 0) {
            console.error("Failed to find this member");
            return;
        }
        this.membersService.removeMember(member).subscribe(() => {
        });
        this.members.splice(i, 1);
    }

    public membersAsUsers(): User[] {
        return this.members.map(m => m.user);
    }
}
