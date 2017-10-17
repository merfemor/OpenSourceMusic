import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {Parallax} from "ngx-parallax";

import {AppComponent} from './app.component';

@NgModule({
    declarations: [AppComponent, Parallax],
    imports: [BrowserModule],
    bootstrap: [AppComponent]
})
export class AppModule {
}
