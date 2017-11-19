export const API_URL_ROOT = "http://localhost:3000/";

export class User {
    public id: number;
    public email: string;
    public password: string;
    public firstName: string;
    public lastName: string;
    public username: string;
    public profileImageUrl: string;
}

export class RequestStatus {
    successful: boolean;
    description?: string;
}