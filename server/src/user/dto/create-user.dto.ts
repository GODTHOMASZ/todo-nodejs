import {MinLength, IsNotEmpty} from "class-validator"

export class CreateUserDto {
    @IsNotEmpty({message: 'Введите имя'})
    name: string

    @IsNotEmpty({message: 'Введите фамилию'})
    surname: string

    middlename: string

    @IsNotEmpty({message: 'Введите логин'})
    login: string

    @MinLength(6, {message: 'Пароль должен быть больше 6 символов'})
    password: string
}
