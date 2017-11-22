import {BrowserModule, Title} from '@angular/platform-browser';
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
import {LoggedInResolver, LoggedUserProfileResolver, NotLoggedInResolver} from "./app.resolvers";
import * as Cloudinary from 'cloudinary-core';
import {CloudinaryModule} from "@cloudinary/angular-4.x";
import {FileUploadModule} from "ng2-file-upload";
import {CloudinarySettings} from "./settings";
import {UploadPhotoComponent} from './profile/settings/upload-photo/upload-photo.component';
import {UserProjectsComponent} from './profile/user-projects/user-projects.component';

@NgModule({
    declarations: [AppComponent, Parallax, HeaderComponent, FooterComponent, ProjectsComponent, MembersComponent, GroupComponent, ProfileComponent, SettingsComponent, AuthComponent, SignInComponent, SignUpComponent, UploadPhotoComponent, UserProjectsComponent],
    imports: [
        FormsModule,
        BrowserModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes),
        DropdownModule,
        HttpClientModule,
        CloudinaryModule.forRoot(Cloudinary, CloudinarySettings),
        FileUploadModule
    ],
    providers: [
        UserService,
        CookieService,
        NotLoggedInResolver,
        LoggedInResolver,
        LoggedUserProfileResolver,
        Title
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
