import {Routes} from "@angular/router";
import {ProfileComponent} from "./profile/profile.component";
import {GroupComponent} from "./group/group.component";
import {SettingsComponent} from "./profile/settings/settings.component";
import {AuthComponent} from "./auth/auth.component";
import {SignInComponent} from "./auth/signin/signin.component";
import {SignUpComponent} from "./auth/signup/signup.component";

export const routes: Routes = [
    {
        path: "",
        redirectTo: "profile",
        pathMatch: "full"
    },
    {
        path: "profile",
        component: ProfileComponent
    },
    {
        path: "group",
        component: GroupComponent
    },
    {
        path: "settings",
        component: SettingsComponent
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
        ]
    }
];