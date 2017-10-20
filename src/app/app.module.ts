import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {Parallax} from "ngx-parallax";

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';

@NgModule({
    declarations: [AppComponent, Parallax, HeaderComponent],
    imports: [BrowserModule],
    bootstrap: [AppComponent]
})
export class AppModule {
}
