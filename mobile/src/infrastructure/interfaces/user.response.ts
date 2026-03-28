export interface User {
    user:  UserClass;
    token: string;
}

export interface UserClass {
    id:    number;
    name:  string;
    email: string;
}
