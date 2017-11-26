import {Pipe, PipeTransform} from '@angular/core';
import {Project, User} from "./api";

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

@Pipe({
    name: 'exceptusers'
})
export class ExceptUsersFilter implements PipeTransform {
    transform(users: User[], ex: User[]): User[] {
        if (!users) return [];
        if (!ex) return users;
        let exids: number[] = ex.map(u => u.id);
        return users.filter(it => !exids.includes(it.id));
    }
}


@Pipe({
    name: 'fullusr'
})
export class ComplexUserFilter implements PipeTransform {
    transform(users: User[], searchText: string): User[] {
        if (!users) return [];
        if (!searchText) return users;
        let phrases = searchText
            .split(' ')
            .map(p => p.toLowerCase().trim())
            .filter(s => s.length > 0);
        console.log(phrases);
        return users.filter(u => {
            let allSuits = true;
            phrases.forEach(phrase => {
                if (!u)
                    return false;
                if (!(
                        (u.firstName && u.firstName.toLowerCase().includes(phrase)) ||
                        (u.lastName && u.lastName.toLowerCase().includes(phrase)) ||
                        u.username.toLowerCase().includes(phrase) ||
                        u.email.toLowerCase().includes(phrase)))
                    allSuits = false;
            });
            return allSuits;
        });
    }
}


@Pipe({
    name: 'projectTitle'
})
export class ProjectTitleFilter implements PipeTransform {
    transform(projects: Project[], searchText: string): Project[] {
        if (!projects) return [];
        if (!searchText) return projects;
        searchText = searchText.toLowerCase();
        return projects.filter(p =>
            p.title.toLowerCase().includes(searchText));
    }
}