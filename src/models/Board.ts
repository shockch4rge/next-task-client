import { IsUUID, IsString } from "class-validator";

export class Board {
	@IsUUID()
    readonly id!: string;

	@IsString()
	readonly title!: string;

	@IsString()
	readonly description!: string;
}