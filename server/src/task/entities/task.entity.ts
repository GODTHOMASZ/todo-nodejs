import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm"
import {User} from "../../user/entities/user.entity"

@Entity({name: 'tasks'})
export class Task {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    deadline: Date

    @Column()
    priority: number

    @Column( {default: 0})
    status: number

    @ManyToOne(() => User, (user) => user.ownedTasks)
    @JoinColumn({name: 'owner'})
    owner: User

    @ManyToOne(() => User, (user) => user.responsibleAtTasks)
    @JoinColumn({name: 'responsible'})
    responsible: User

    @CreateDateColumn()
    createAt: Date

    @UpdateDateColumn()
    updateAt: Date
}
