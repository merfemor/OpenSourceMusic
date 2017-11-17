import {Routes} from "@angular/router";
import {ProfileComponent} from "./profile/profile.component";
import {GroupComponent} from "./group/group.component";
import {SettingsComponent} from "./profile/settings/settings.component";
import {AuthComponent} from "./profile/auth/auth.component";
import {SignInComponent} from "./profile/auth/signin/signin.component";
import {SignUpComponent} from "./profile/auth/signup/signup.component";
import {LoggedInResolver, NotLoggedInResolver} from "./app.resolvers";

export const routes: Routes = [
    {
        path: "profile/:username",
        component: ProfileComponent
    },
    {
        path: "group",
        component: GroupComponent
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
        redirectTo: "group",
        pathMatch: "prefix"
    }
];