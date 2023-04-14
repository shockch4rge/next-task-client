import { IsUUID, IsString } from "class-validator";

export class Board {
	@IsUUID()
    public readonly id!: string;

	@IsString()
	public readonly title!: string;

	@IsString()
	public readonly description!: string;
}