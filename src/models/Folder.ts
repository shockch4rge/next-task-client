import { IsNumber, IsString, IsUUID } from "class-validator";

export class Folder {
    @IsUUID()
    public readonly id!: string;

    @IsUUID()
    public readonly boardId!: string;

    @IsString()
    public readonly title!: string;

    @IsString()
    public readonly description!: string;

    @IsNumber()
    public readonly boardIndex!: number;
}