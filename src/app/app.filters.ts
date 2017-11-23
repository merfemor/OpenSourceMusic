import {Pipe, PipeTransform} from '@angular/core';
import {User} from "./api";

@Pipe({
    name: 'username'
})
export class UsernameFilter implements PipeTransform {
    transform(users: User[], searchText: string): User[] {
        if (!users) return [];
        if (!searchText) return users;
        searchText = searchText.toLowerCase();
        return users.filter(it =>
            it.username.toLowerCase().includes(searchText));
    }
}