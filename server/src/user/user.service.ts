import {BadRequestException, Injectable} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";
import * as argon2 from "argon2";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class UserService {
  constructor(
      @InjectRepository(User) private readonly userRepository: Repository<User>,
      private readonly jwtService: JwtService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existUser = await this.userRepository.findOne({
      where: {
        login: createUserDto.login,
      }
    })
    if(existUser)throw new BadRequestException('Пользователь с таким логином уже существует')

    const user = await this.userRepository.save({
      name: createUserDto.name,
      surname: createUserDto.surname,
      middlename: createUserDto.middlename,
      login: createUserDto.login,
      password: await argon2.hash(createUserDto.password)
    })

    const token = this.jwtService.sign({login: createUserDto.login})

    const data = {
      id: user.id,
      login: user.login,
      name: user.name,
      surname: user.surname,
      middlename: user.middlename,
      token
    }

    return data
  }

  async findOne(login: string) {
    const user = await this.userRepository
        .createQueryBuilder('users')
        .select(["users.id", "users.login", "users.name", "users.surname", "users.middlename", "users.password"])
        .where("users.login = :login", { login })
        .getOne()

    return user
  }

  async findAllSubordinates(id: number) {
    return await this.userRepository.find({
      where: [
        {boss: { id }},
        {id},
      ],
      order: {
        surname: "ASC"
      }
    })
  }
}
