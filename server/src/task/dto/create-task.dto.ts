import {IsNotEmpty, IsOptional, IsDateString} from "class-validator"
import {User} from "../../user/entities/user.entity"

export class CreateTaskDto {
    @IsNotEmpty()
    title: string

    @IsOptional()
    description?: string

    @IsNotEmpty()
    @IsDateString()
    deadline: string

    @IsNotEmpty()
    priority: number

    status: number

    owner: User

    responsible: User
}
