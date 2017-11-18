import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styles: []
})
export class AppComponent {
}

export const APP_NAME: string = "OpenSourceMusic";
export const TITLE_SUFFIX: string = " | " + APP_NAME;
