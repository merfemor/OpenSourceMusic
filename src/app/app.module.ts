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
import {AuthComponent} from './profile/auth/auth.component';
import {SignInComponent} from './profile/auth/signin/signin.component';
import {SignUpComponent} from './profile/auth/signup/signup.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DropdownModule} from "ngx-dropdown";
import {UserService} from "./user.service";
import {HttpClientModule} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {NotLoggedInResolver} from "./app.resolvers";


@NgModule({
    declarations: [AppComponent, Parallax, HeaderComponent, FooterComponent, ProjectsComponent, MembersComponent, GroupComponent, ProfileComponent, SettingsComponent, AuthComponent, SignInComponent, SignUpComponent],
    imports: [
        FormsModule,
        BrowserModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes),
        DropdownModule,
        HttpClientModule
    ],
    providers: [UserService, CookieService, NotLoggedInResolver],
    bootstrap: [AppComponent]
})
export class AppModule {
}
