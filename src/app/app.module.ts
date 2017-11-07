import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {Parallax} from "ngx-parallax";

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {ProjectsComponent} from './group/projects/projects.component';
import {MembersComponent} from './group/members/members.component';
import {GroupComponent} from "./group/group.component";
import {ProfileComponent} from './profile/profile.component';
import {RouterModule} from "@angular/router";
import {routes} from "./app.routes";
import {SettingsComponent} from './profile/settings/settings.component';
import {AuthComponent} from './auth/auth.component';
import {SignInComponent} from './auth/signin/signin.component';
import {SignUpComponent} from './auth/signup/signup.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
    declarations: [AppComponent, Parallax, HeaderComponent, FooterComponent, ProjectsComponent, MembersComponent, GroupComponent, ProfileComponent, SettingsComponent, AuthComponent, SignInComponent, SignUpComponent],
    imports: [
        FormsModule,
        BrowserModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes)
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
