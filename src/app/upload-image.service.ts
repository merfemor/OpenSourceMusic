import {Injectable} from '@angular/core';
import {FileUploader, FileUploaderOptions} from "ng2-file-upload";
import {Cloudinary} from "@cloudinary/angular-4.x";

@Injectable()
export class UploadImageService {
    private uploader: FileUploader;

    constructor(private cloudinary: Cloudinary) {
        const uploaderOptions: FileUploaderOptions = {
            url: `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/image/upload`,
            autoUpload: false,
            isHTML5: true, // Use xhrTransport in favor of iframeTransport
            removeAfterUpload: true, // Calculate progress independently for each uploaded file
            headers: [{ // XHR request headers
                name: 'X-Requested-With',
                value: 'XMLHttpRequest'
            }]
        };

        this.uploader = new FileUploader(uploaderOptions);

        this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
            // Add Cloudinary's unsigned upload preset to the upload form
            form.append('upload_preset', this.cloudinary.config().upload_preset);
            form.append('file', fileItem);
            // Use default "withCredentials" value for CORS requests
            fileItem.withCredentials = false;
            return {fileItem, form};
        };
    }

    public setOnCompleteItem(onCompleteItem: (response: string) => void) {
        this.uploader.onCompleteItem = (item, response: string, status, headers) => onCompleteItem(response)
    }

    public getUploader(): FileUploader {
        return this.uploader;
    }

    public upload(): void {
        this.uploader.uploadAll();
    }

    public isNothingToUpload(): boolean {
        return this.uploader.getNotUploadedItems().length === 0;
    }

    public isUploading(): boolean {
        return this.uploader.isUploading;
    }

    public getFirstItemName(): string {
        let q = this.uploader.queue;
        if (q.length < 1)
            return null;
        return q[0].file.name;
    }
}
