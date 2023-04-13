import { IsNumber, IsString, IsUUID } from "class-validator";

export class Task {
    @IsUUID()
    public readonly id!: string;

    @IsString()
    public readonly boardId!: string;

    @IsString()
    public readonly folderId!: string;

    @IsUUID()
    public readonly authorId!: string;

    @IsString()
    public readonly title!: string;

    @IsString()
    public readonly description!: string;

    @IsString()
    public readonly status!: "completed" | "open" | "pending";

    @IsNumber()
    public readonly folderIndex!: number;
}