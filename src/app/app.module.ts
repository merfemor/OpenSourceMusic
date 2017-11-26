import {BrowserModule, Title} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {MembersComponent} from './project/members/members.component';
import {MainComponent} from "./main/main.component";
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
import {IdIsNotNumberResolver, LoggedInResolver, LoggedUserProfileResolver, NotLoggedInResolver} from "./app.resolvers";
import {FileUploadModule} from "ng2-file-upload";
import {UploadPhotoComponent} from './profile/settings/upload-photo/upload-photo.component';
import {UserProjectsComponent} from './profile/user-projects/user-projects.component';
import {NewProjectComponent} from "./project/new-project/new-project.component";
import {ProjectMemberService} from "./project-member.service";
import {InlineEditorModule} from '@qontu/ngx-inline-editor';

import {Cloudinary} from 'cloudinary-core/cloudinary-core-shrinkwrap';
import {CloudinaryModule} from '@cloudinary/angular-4.x';
import {CloudinarySettings} from "./settings";
import {ExceptUsersFilter, UsernameFilter} from "./app.filters";
import {FilesListComponent} from './project/files-list/files-list.component';
import {FileDropModule} from "ngx-file-drop";
import {ProjectComponent} from "./project/project.component";

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        MembersComponent,
        MainComponent,
        ProjectComponent,
        ProfileComponent,
        SettingsComponent,
        AuthComponent,
        SignInComponent,
        SignUpComponent,
        UploadPhotoComponent,
        UserProjectsComponent,
        NewProjectComponent,
        UsernameFilter,
        ExceptUsersFilter,
        FilesListComponent
    ],
    imports: [
        FormsModule,
        BrowserModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes),
        DropdownModule,
        HttpClientModule,
        CloudinaryModule.forRoot({Cloudinary: Cloudinary}, CloudinarySettings),
        FileUploadModule,
        InlineEditorModule,
        FileDropModule
    ],
    providers: [
        UserService,
        CookieService,
        NotLoggedInResolver,
        LoggedInResolver,
        LoggedUserProfileResolver,
        IdIsNotNumberResolver,
        ProjectMemberService,
        Title
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
