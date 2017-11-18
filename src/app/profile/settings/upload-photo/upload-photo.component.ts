import {Component} from '@angular/core';
import {FileUploader} from "ng2-file-upload";
import {UploadImageService} from "../../../upload-image.service";

@Component({
    selector: 'app-upload-photo',
    templateUrl: 'upload-photo.component.html',
    styleUrls: ['upload-photo.component.sass'],
    providers: [UploadImageService]
})

// TODO: prevent multiple dropping
// TODO: make select item button active
export class UploadPhotoComponent {
    public hasBaseDropZoneOver = false;
    public uploader: FileUploader;
    public isDone: boolean = false;
    public isError: boolean = false;

    constructor(public uploadService: UploadImageService) {
        this.uploader = uploadService.getUploader();
        uploadService.setOnCompleteItem(response => {
            console.log(response);
            this.isDone = true;
        });
    }
}
