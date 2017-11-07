import {Routes} from "@angular/router";
import {ProfileComponent} from "./profile/profile.component";
import {GroupComponent} from "./group/group.component";
import {SettingsComponent} from "./profile/settings/settings.component";
import {RegistrationComponent} from "./registration/registration.component";

export const routes: Routes = [
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
        component: RegistrationComponent
    }
];