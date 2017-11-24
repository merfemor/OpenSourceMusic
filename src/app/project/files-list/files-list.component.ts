import {Component, Input} from '@angular/core';
import {ProjectFile} from "../../api";
import {ProjectService} from "../../project.service";

@Component({
    selector: 'app-files-list',
    templateUrl: 'files-list.component.html',
    styleUrls: ['files-list.component.sass'],
    providers: [ProjectService]
})
export class FilesListComponent {
    @Input() public projectId: number;
    public files: ProjectFile[] = [];

    constructor(private projectService: ProjectService) {
    }

    public getFormattedDate(sec: number): string {
        return new Date(sec).toDateString()
    }
}
