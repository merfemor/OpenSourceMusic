import {Routes} from "@angular/router";
import {ProfileComponent} from "./profile/profile.component";
import {MainComponent} from "./main/main.component";
import {SettingsComponent} from "./profile/settings/settings.component";
import {AuthComponent} from "./profile/auth/auth.component";
import {SignInComponent} from "./profile/auth/signin/signin.component";
import {SignUpComponent} from "./profile/auth/signup/signup.component";
import {IdIsNotNumberResolver, LoggedInResolver, LoggedUserProfileResolver, NotLoggedInResolver} from "./app.resolvers";
import {NewProjectComponent} from "./project/new-project/new-project.component";
import {ProjectComponent} from "./project/project.component";
import {SearchComponent} from "./search/search.component";

export const routes: Routes = [
    {
        path: "",
        component: MainComponent
    },
    {
        path: "search",
        redirectTo: "search/",
        pathMatch: "full"
    },
    {
        path: "search/:query",
        component: SearchComponent
    },
    {
        path: "profile",
        component: ProfileComponent,
        resolve: [NotLoggedInResolver, LoggedUserProfileResolver]
    },
    {
        path: "profile/:username",
        component: ProfileComponent
    },
    {
        path: "project/new",
        component: NewProjectComponent,
        resolve: [NotLoggedInResolver]
    },
    {
        path: "project/:id",
        component: ProjectComponent,
        resolve: [IdIsNotNumberResolver]
    },
    {
        path: "settings",
        component: SettingsComponent,
        resolve: [NotLoggedInResolver]
    },
    {
        path: "join",
        component: AuthComponent,
        children: [
            {
                path: "",
                redirectTo: "signin",
                pathMatch: "prefix"
            },
            {
                path: "signin",
                component: SignInComponent
            },
            {
                path: "signup",
                component: SignUpComponent
            }
        ],
        resolve: [LoggedInResolver]
    },
    {
        path: "**",
        redirectTo: "/",
        pathMatch: "full"
    }
];