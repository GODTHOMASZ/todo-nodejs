import { Injectable, UnauthorizedException } from '@nestjs/common'
import {UserService} from "../user/user.service"
import * as argon2 from "argon2"
import {JwtService} from "@nestjs/jwt"
import {IUser} from "../types/types"

@Injectable()
export class AuthService {
  constructor(
      private userService: UserService,
      private jwtService: JwtService
  ) {}

  async validateUser(login: string, password: string) {
    const user = await this.userService.findOne(login)
    if (!user) throw new UnauthorizedException('Пользователя с таким логином не существует')
    const passwordIsMatch = await argon2.verify(user.password, password)
    if (user && passwordIsMatch) {
      return user;
    }
    throw new UnauthorizedException('Пароль неверный')
  }

  async login(user: IUser) {
    const { id, login, name, surname, middlename } = user
    return {
      id,
      login,
      name, 
      surname, 
      middlename,
      token: this.jwtService.sign({id: user.id, login: user.login}),
    }
  }
}
