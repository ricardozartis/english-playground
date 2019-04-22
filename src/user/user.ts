import {MinLength} from "class-validator";

export class User {
    @MinLength(6)
    username: string;
    @MinLength(6)
    password: string;
    createdAt?: string;
}
