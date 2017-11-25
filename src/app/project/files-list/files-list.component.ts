import {Component, Input} from '@angular/core';
import {ProjectFile} from "../../api";
import {ProjectService} from "../../project.service";
import {UploadEvent, UploadFile} from "ngx-file-drop";
import {UploadFilesService} from "../../upload-files.service";

@Component({
    selector: 'app-files-list',
    templateUrl: 'files-list.component.html',
    styleUrls: ['files-list.component.sass'],
    providers: [ProjectService, UploadFilesService]
})
export class FilesListComponent {
    @Input() public projectId: number;
    public files: ProjectFile[] = [];

    constructor(public uploadService: UploadFilesService) {
    }

    public getFormattedDate(sec: number): string {
        return new Date(sec).toDateString()
    }

    onFileDrop(event: UploadEvent) {
        let files: UploadFile[] = event.files;
        console.log(files);
        files.forEach(file =>
            this.uploadService.addFile(file.relativePath, this.projectId));
    }

    onFileSelected(event) {
        let files: FileList = event.srcElement.files;
        for (let i = 0; i < files.length; i++)
            this.uploadService.addFile(files.item(i).name, this.projectId);
    }

    status(): string {
        return 'NOT_SELECTED';
    }
}
