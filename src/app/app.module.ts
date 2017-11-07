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
import {RegistrationComponent} from './registration/registration.component';
import {SignInComponent} from './registration/signin/signin.component';
import {SignUpComponent} from './registration/signup/signup.component';


@NgModule({
    declarations: [AppComponent, Parallax, HeaderComponent, FooterComponent, ProjectsComponent, MembersComponent, GroupComponent, ProfileComponent, SettingsComponent, RegistrationComponent, SignInComponent, SignUpComponent],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
