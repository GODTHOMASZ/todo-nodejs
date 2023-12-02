import {CanActivate, ExecutionContext} from '@nestjs/common'
import {TaskService} from "../task/task.service"

export class OwnerGuard implements CanActivate {
    constructor(
        private readonly taskService: TaskService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean>{
        const request = context.switchToHttp().getRequest()
        const id = request.params.id
        const user = request.user

        const entity = await this.taskService.findOne(+id)

        if (entity && user && entity.owner === user.id){
            return true
        }

        return false
    }
}