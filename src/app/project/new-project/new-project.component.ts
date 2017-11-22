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

    constructor(private router: Router, private projectService: ProjectService) {
    }

    submit() {
        let project = new Project();
        project.title = this.form.get('title').value;
        project.description = this.form.get('description').value;
        this.projectService.createProject(project).subscribe(status => {
            if (status.successful) {
                this.router.navigateByUrl("/");
            } else {
                alert('Failed to create project.\n' + status.description)
            }
        });
    }
}
