import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import {Repository, Not, Between, MoreThan} from "typeorm"
import {Task} from "./entities/task.entity"
import {InjectRepository} from "@nestjs/typeorm"

@Injectable()
export class TaskService {
  constructor(
      @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto, id: number) {

    const newTask = {
      title: createTaskDto.title,
      description: createTaskDto.description,
      deadline: createTaskDto.deadline,
      priority: createTaskDto.priority,
      owner: { id },
      responsible: createTaskDto.responsible.id == 0 ? {id} : createTaskDto.responsible
    }

    return await this.taskRepository.save(newTask)
  }

  async findAll(id: number) {
    return await this.taskRepository.find({
      where: {
        responsible: { id }
      },
      relations: {
        owner: true,
        responsible: true
      },
      order: {
        updateAt: "DESC"
      }
    })
  }

  async findDate(id: number) {
    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)
    const todayEnd = new Date(todayStart)
    todayEnd.setDate(todayStart.getDate() + 1)
    const weekAgo = new Date(todayEnd)
    weekAgo.setDate(todayStart.getDate() + 7)

    const todayTasks = await this.taskRepository.find({
      where: {
        owner: { id },
        responsible: { id },
        deadline: Between(todayStart, todayEnd)
      },
      relations: {
        owner: true,
        responsible: true
      },
      order: {
        deadline: "ASC"
      }
    })

    const thisWeekTasks = await this.taskRepository.find({
      where: {
        owner: { id },
        responsible: { id },
        deadline: Between(todayEnd, weekAgo)
      },
      relations: {
        owner: true,
        responsible: true
      },
      order: {
        deadline: "ASC"
      }
    })

    const futureTasks = await this.taskRepository.find({
      where: {
        owner: { id },
        responsible: { id },
        deadline: MoreThan(weekAgo)
      },
      relations: {
        owner: true,
        responsible: true
      },
      order: {
        deadline: "ASC"
      }
    })

    const data = [
      todayTasks,
      thisWeekTasks,
      futureTasks
    ]

    return data
  }

  async findSubordinates(id: number) {
    return await this.taskRepository.find({
      where: {
        owner: { id },
        responsible: Not(id)
      },
      relations: {
        owner: true,
        responsible: true
      },
      order: {
        updateAt: "DESC"
      }
    })
  }

  async findAllPagination(id: number, type: number, page: number, limit: number) {
    return await this.taskRepository.find({
      where: {
        owner: { id },
        responsible: type == 1 ? { id } : Not(id)
      },
      relations: {
        owner: true,
        responsible: true
      },
      order: {
        deadline: "ASC"
      },
      take: limit,
      skip: (page - 1) * limit
    })
  }

  async findOne(id: number) {
    const task = await this.taskRepository.findOne({
      where: {
        id
      },
      relations: {
        owner: true,
        responsible: true
      }
    })

    if (!task) throw new NotFoundException('Task not found')

    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto, user_id: number) {
    const task = await this.findOne(id)

    if (!task) throw new NotFoundException('Task not found')

    if (task.owner.id == user_id) {
      return await this.taskRepository.update(id, updateTaskDto)
    } else{
      return await this.taskRepository.update(id, {status: updateTaskDto.status})
    }
  }

  async remove(id: number, user_id: number) {
    const task = await this.findOne(id)

    if (!task) throw new NotFoundException('Task not found')

    if (task.owner.id !== user_id) throw new NotFoundException('Access denied')

    return await this.taskRepository.delete(id)
  }
}
