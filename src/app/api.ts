export const API_URL_ROOT = "http://localhost:3000/";

export class User {
    public email: string;
    public password: string;
    public firstName: string;
    public lastName: string;
    public username: string;
}

export class AuthorizationStatus {
    successful: boolean;
    description?: string;
}