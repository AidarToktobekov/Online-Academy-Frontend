import {IUser} from "./usersTypes";

export interface CourseCategory{
    id: number;
    title: string;
    description: string;
}

export interface Course {
    id: number;
    name: string;
    category: CourseCategory;
    categoryId: number;
    author: IUser;
    authorId: number;
    createdAt: Date;
}