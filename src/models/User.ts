import { IsEmail, IsString, IsUUID } from "class-validator";

export class User {
    @IsUUID()
    public readonly id!: string;

    @IsString()
    public readonly name!: string;

    @IsEmail()
    public readonly email!: string;
}