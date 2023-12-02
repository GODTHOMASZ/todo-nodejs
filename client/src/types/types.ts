export interface IUser {
    id: number
    name?: string
    surname?: string
    middlename?: string
    token: string
}

export interface IUserData {
    name?: string
    surname?: string
    middlename?: string
    login: string
    password: string
}

export interface IResponseUser {
    id: string
    name?: string
    surname?: string
    middlename?: string
    login: string
    createdAt: string
    updatedAt: string
}

export interface IResponseUserData {
    token: string
    user: IResponseUser
}

export interface ITaskData {
    id: number
    title: string
    description: string
    deadline: string
    status: number
    priority: number
    createdAt: string
    updatedAt: string
    owner: []
    responsible: IResponseUser
}

export interface ITaskGroupData {
    taskGroup: ITaskData[]
}

export interface IResponseTaskData {
    allTasks: ITaskData[]
    bossTasks: ITaskData[]
    deadlineTasks: ITaskGroupData[]
    subordinates: IResponseUser[]
}

export interface ITaskDataParams {
    setTaskId: (visible: number) => void
    setTasks: (visible: ITaskData) => void
    setVisibleModal: (visible: boolean) => void
    setIsPatch: (visible: boolean) => void
    statuses: string[]
    priority: string[]
}

export interface ITasks extends ITaskDataParams {
    tasks: ITaskData[]
}

export interface ITasksGroup extends ITaskDataParams {
    tasks: ITaskGroupData[]
}
