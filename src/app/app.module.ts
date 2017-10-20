import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {Parallax} from "ngx-parallax";

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {ProjectsComponent} from './projects/projects.component';
import {MembersComponent} from './members/members.component';

@NgModule({
    declarations: [AppComponent, Parallax, HeaderComponent, FooterComponent, ProjectsComponent, MembersComponent],
    imports: [BrowserModule],
    bootstrap: [AppComponent]
})
export class AppModule {
}
