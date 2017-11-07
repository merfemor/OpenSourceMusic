import {Routes} from "@angular/router";
import {ProfileComponent} from "./profile/profile.component";
import {GroupComponent} from "./group/group.component";
import {SettingsComponent} from "./profile/settings/settings.component";
import {RegistrationComponent} from "./registration/registration.component";
import {SignInComponent} from "./registration/signin/signin.component";
import {SignUpComponent} from "./registration/signup/signup.component";

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
        component: RegistrationComponent,
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