import {Injectable} from '@angular/core';
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {API_URL_ROOT, ProjectFile} from "./api";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable()
export class ProjectFilesService {
    private taskQueue: Subject<ProjectFile> = new Subject();
    private resultQueue: Subject<ProjectFile> = new Subject();
    private currentUploads: number = 0;

    constructor(private http: HttpClient) {
        this.taskQueue.subscribe(file => {
            this.currentUploads++;
            let o: Observable<ProjectFile> = this.http.post<ProjectFile>(
                API_URL_ROOT + "project-files",
                file,
                {
                    headers: new HttpHeaders().set("Content-Type", "application/json")
                });
            o.subscribe((file) => {
                this.resultQueue.next(file);
                this.currentUploads--;
            });
        })
    }

    public addFile(filename: string, projectId: number): void {
        this.taskQueue.next({
            name: filename,
            projectId: projectId,
            uploadDate: Date.now()
        });
    }

    public onFileUploaded(f: (pf: ProjectFile) => any) {
        this.resultQueue.subscribe(f);
    }

    public isUploading(): boolean {
        return this.currentUploads > 0;
    }

    public getAllFiles(projectId: number): Observable<ProjectFile[]> {
        return this.http.get(API_URL_ROOT + "project-files", {
            params: new HttpParams().set("projectId", projectId.toString())
        });
    }

    public deleteProjectFile(fileId: number) {
        return this.http.delete(API_URL_ROOT + "project-files/" + fileId);
    }
}
