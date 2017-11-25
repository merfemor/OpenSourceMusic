import {Component, Input, OnInit} from '@angular/core';
import {ProjectFile} from "../../api";
import {UploadEvent, UploadFile} from "ngx-file-drop";
import {ProjectFilesService} from "../../project-files.service";

@Component({
    selector: 'app-files-list',
    templateUrl: 'files-list.component.html',
    styleUrls: ['files-list.component.sass'],
    providers: [ProjectFilesService]
})
export class FilesListComponent implements OnInit {
    @Input() public projectId: number;
    @Input() public isUserManager: boolean = false;
    @Input() public isUserCreator: boolean = false;
    public files: ProjectFile[] = [];

    constructor(public projectFilesService: ProjectFilesService) {
    }

    public getFormattedDate(sec: number): string {
        return new Date(sec).toDateString()
    }

    onFileDrop(event: UploadEvent) {
        let files: UploadFile[] = event.files;
        files.forEach(file =>
            this.projectFilesService.addFile(file.relativePath, this.projectId));
    }

    onFileSelected(event) {
        let files: FileList = event.srcElement.files;
        for (let i = 0; i < files.length; i++)
            this.projectFilesService.addFile(files.item(i).name, this.projectId);
    }

    ngOnInit() {
        this.projectFilesService.getAllFiles(this.projectId).subscribe(files => {
            this.files = files;
            this.projectFilesService.onFileUploaded(pf => this.files.push(pf));
        });
    }
}
