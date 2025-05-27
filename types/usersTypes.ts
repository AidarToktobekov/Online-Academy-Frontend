export interface IUser {
    access_token: string;
    user: {
        id: number;
        email: string;
        username: string;
        createdAt: Date;
    };
}

export interface UserMutation{
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface ValidationError{
    errors: {
        [key:string]:{
            name: string;
            message:string;
        };
    };
    message: string;
    name: string;
    _message: string;
}

export interface GlobalError {
    message: string;
    error: string;
    statusCode: number;
}

export interface UserLogin{
    email: string;
    password: string;
}