import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SearchService} from "../search.service";
import {ProjectService} from "../project.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    selector: 'app-search',
    templateUrl: 'search.component.html',
    styleUrls: ['search.component.sass'],
    providers: [SearchService, ProjectService]
})
export class SearchComponent {
    public searchPhrase: string;

    public sanitizeUrl = (url) =>
        this.sanitizer.bypassSecurityTrustStyle('url("' + url + '")');

    constructor(private activatedRoute: ActivatedRoute,
                public cont: SearchService,
                private sanitizer: DomSanitizer) {
        this.activatedRoute.params.subscribe(params => {
            this.searchPhrase = params.query;
        });

    }
    ;
}
