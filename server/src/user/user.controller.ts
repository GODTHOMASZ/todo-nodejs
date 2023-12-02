import {Controller, Post, Body, UsePipes, ValidationPipe, Get, UseGuards, Param, Request} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard"

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('new')
  @UsePipes(new ValidationPipe())
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }
  
  @Get('subordinates')
  @UseGuards(JwtAuthGuard)
  findAll(@Request() req) {
    return this.userService.findAllSubordinates(+req.user.id)
  }
}
