import {Component, Input, OnInit} from '@angular/core';
import {ProjectMember, Role} from "../../api";
import {ProjectMemberService} from "../../project-member.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    selector: 'app-members',
    templateUrl: './members.component.html',
    styleUrls: ['./members.component.sass']
})
export class MembersComponent implements OnInit {
    @Input() public projectId: number;
    public members: ProjectMember[] = [];
    public Role = Role;
    public getSanitizedUserProfileImageUrl = (url) =>
        this.sanitizer.bypassSecurityTrustStyle('url("' + url + '")')

    constructor(private membersService: ProjectMemberService,
                private sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        this.membersService.getAllMembersOfProject(this.projectId)
            .subscribe(members => this.members = members);
    }

}
