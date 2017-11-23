export const API_URL_ROOT = "http://localhost:3000/";

export class User {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    username: string;
    profileImageUrl: string;
}

export class Project {
    id: number;
    madeByUser: boolean;
    madeById: number;
    title: string;
    description: string;
    creationDate: number;
    isEmpty: boolean;
}

export class RequestStatus {
    successful: boolean;
    description?: string;
}


export class Role {
    static CREATOR = 0;
    static MEMBER = 1;
}

export class ProjectMember {
    user: User;
    projectId: number;
    role: number; // one of the class Role statics
}