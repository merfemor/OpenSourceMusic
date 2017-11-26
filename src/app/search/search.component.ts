import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-search',
    templateUrl: 'search.component.html',
    styleUrls: ['search.component.sass']
})
export class SearchComponent {
    public searchPhrase: string;

    constructor(private activatedRoute: ActivatedRoute) {
        this.activatedRoute.params.subscribe(params => {
            this.searchPhrase = params.query;
        })
    }
}
