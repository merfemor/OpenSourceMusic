import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {ProjectService} from "../../project.service";
import {Project} from "../../api";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-new-project',
    templateUrl: './new-project.component.html',
    styleUrls: ['./new-project.component.sass'],
    providers: [ProjectService]
})
export class NewProjectComponent {
    form = new FormGroup({
        title: new FormControl('', Validators.required),
        description: new FormControl()
    });
    private project: Project;

    constructor(private router: Router, private projectService: ProjectService) {
    }

    submit() {
        this.project = new Project();
        this.project.title = this.form.get('title').value;
        this.project.description = this.form.get('description').value;
    }
}
