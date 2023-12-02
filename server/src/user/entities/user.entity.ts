import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm"
import {Task} from "../../task/entities/task.entity"

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    surname: string

    @Column()
    middlename: string

    @Column()
    login: string

    @Column({select: false})
    password: string

    @OneToMany(() => Task, (task) => task.owner, {onDelete: 'CASCADE'})
    ownedTasks: Task[]

    @OneToMany(() => Task, (task) => task.responsible, {onDelete: 'CASCADE'})
    responsibleAtTasks: Task[]

    @OneToMany(() => User, (user) => user.boss, {onDelete: 'SET NULL'})
    userBoss: User[]

    @ManyToOne(() => User, (user) => user.userBoss)
    boss: User

    @CreateDateColumn()
    createAt: Date

    @UpdateDateColumn()
    updateAt: Date
}
