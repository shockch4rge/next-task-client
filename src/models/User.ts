import { IsArray, IsEmail, IsString, IsUUID } from "class-validator";

export class User {
    @IsUUID()
    readonly id!: string;

    @IsString()
    readonly name!: string;

    @IsEmail()
    readonly email!: string;

    // TODO
    // @IsArray()
    // readonly tasks!: Task[];
}