import {Component} from '@angular/core';
import {FileUploader} from "ng2-file-upload";
import {UploadImageService} from "../../../upload-image.service";
import {UserService} from "../../../user.service";

@Component({
    selector: 'app-upload-photo',
    templateUrl: 'upload-photo.component.html',
    styleUrls: ['upload-photo.component.sass'],
    providers: [UploadImageService]
})
export class UploadPhotoComponent {
    public hasBaseDropZoneOver = false;
    public uploader: FileUploader;
    public error;
    private isDone: boolean = false;

    constructor(public uploadService: UploadImageService, private userService: UserService) {
        this.uploader = uploadService.getUploader();
        uploadService.subscribe(imageUrl => {
            this.userService.changeProfileImage(imageUrl).subscribe(status => {
                if (status.successful)
                    this.isDone = true;
                else
                    this.error = {message: status.description};
            })
        }, error => this.error = error);
        uploadService.onBuildItemForm(() => {
            this.error = null;
            this.isDone = false;
        });
    }

    public onFileChoose(event) {
        this.uploadService.addFile(event.srcElement.files[0]);
        this.error = null;
        this.isDone = false;
    }

    public status(): string {
        if (this.uploadService.isUploading())
            return 'UPLOADING';
        else if (!this.uploadService.isNothingToUpload())
            return 'SELECTED';
        if (this.isDone)
            return 'UPLOADED_SUCCESS';
        else if (this.error)
            return 'UPLOADED_ERROR';
        else
            return 'NOT_SELECTED';
    }
}

