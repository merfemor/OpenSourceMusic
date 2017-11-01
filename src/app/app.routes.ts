import {Routes} from "@angular/router";
import {ProfileComponent} from "./profile/profile.component";
import {GroupComponent} from "./group/group.component";

export const routes: Routes = [
    {
        path: "profile",
        component: ProfileComponent
    },
    {
        path: "group",
        component: GroupComponent
    }
];