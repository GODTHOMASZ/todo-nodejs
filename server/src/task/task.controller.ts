import {Controller, Get, Post, Body, Patch, Param, Request, Delete, UseGuards, UsePipes, Query, ValidationPipe} from '@nestjs/common'
import { TaskService } from './task.service'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard"
import {OwnerGuard} from "../guards/owner.guard"

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  create(@Body() createTaskDto: CreateTaskDto, @Request() req) {
    return this.taskService.create(createTaskDto, +req.user.id)
  }

  @Get('group/all')
  @UseGuards(JwtAuthGuard)
  findAll(@Param('type') type: string, @Request() req) {
    return this.taskService.findAll(+req.user.id)
  }

  @Get('group/date')
  @UseGuards(JwtAuthGuard)
  findDate(@Param('type') type: string, @Request() req) {
    return this.taskService.findDate(+req.user.id)
  }

  @Get('group/subordinates')
  @UseGuards(JwtAuthGuard)
  findSubordinates(@Param('type') type: string, @Request() req) {
    return this.taskService.findSubordinates(+req.user.id)
  }

  @Get('all/:type/pagination')
  @UseGuards(JwtAuthGuard)
  findAllPagination(
      @Param('type') type: string,
      @Request() req,
      @Query('page') page: number,
      @Query('limit') limit: number
  ) {
    return this.taskService.findAllPagination(+req.user.id, +type, +page, +limit)
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @Request() req) {
    return this.taskService.update(+id, updateTaskDto, +req.user.id)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string,  @Request() req) {
    return this.taskService.remove(+id, +req.user.id)
  }
}
