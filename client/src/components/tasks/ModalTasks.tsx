import { FC } from 'react'
import { Form } from 'react-router-dom'
import { HiOutlineXCircle  } from "react-icons/hi"
import { authUser } from '../../hooks/useAuth'
import { IResponseUser } from '../../types/types'
import dateFormat from "dateformat"

interface Props {
    type: 'post' | 'patch'
    id?: number
    setVisibleModal: (visible: boolean) => void
    task: any | null
    subordinates: IResponseUser[]
}



const ModalTasks: FC<Props> = ( {type, id, setVisibleModal, task, subordinates}) => {
    const user = authUser()

    return (
    <div className='fixed top-0 left-0 bottom-0 right-0 w-screen h-screen bg-slate-500/50 flex justify-end'>
        <div className='bg-white px-10 py-4 form-medium'>
            <Form
                action='/task'
                method={type}
                onSubmit={() => setVisibleModal(false)}
                className='flex flex-col gap-4 '
            >
                <div className='flex items-center justify-between'>
                    <h2 className='text-lg'>{type === 'patch' ? `Редактирование задачи ${task?.title}` : 'Создать новую задачу'}</h2>
                    <button onClick={() => setVisibleModal(false)} type='button'>
                        <HiOutlineXCircle size={20}/>
                    </button>
                </div>
                {type === 'patch' &&
                    <input
                        name='id'
                        type="hidden"
                        value={id}
                    />
                }
                <hr />
                <label>
                    <small>Заголовок задачи</small>
                    <input 
                        className='input w-full border-light-blue'
                        type="text"
                        title='Заголовок задачи'
                        name='title'
                        placeholder='Введите заголовок задачи'
                        defaultValue={type === 'patch' ? `${task?.title}` : ''}
                        required
                        disabled={type === 'patch' && task.owner.id != user?.id ? true : false }
                    />
                </label>
                <label>
                    <small>Описание</small>
                    <textarea 
                        className='input w-full border-light-blue'
                        title='Описание задачи'
                        name='description'
                        placeholder='Введите описание задачи'
                        defaultValue={type === 'patch' ? `${task?.description}` : ''}
                        disabled={type === 'patch' && task.owner.id != user?.id ? true : false }
                    >
                    
                    </textarea>
                </label>
                <label>
                    <small>Приоритет</small>
                    <select 
                        name='priority' 
                        className='input w-full border-light-blue' 
                        title='Приоритет задачи' 
                        defaultValue={type === 'patch' ? `${task.priority}` : '0'}
                        disabled={type === 'patch' && task.owner.id != user?.id ? true : false }
                    >
                        <option value='0'>Низкий</option>
                        <option value='1'>Средний</option>
                        <option value='2'>Высокий</option>
                    </select>
                </label>
                {type === 'patch' &&
                    <label>
                        <small>Статус</small>
                        <select 
                            name='status' 
                            className='input w-full border-light-blue' 
                            title='Статус задачи' 
                            defaultValue={type === 'patch' ? `${task.status}` : '0'}
                        >
                            <option value='0'>К выполнению</option>
                            <option value='1'>Выполняется</option>
                            <option value='2'>Выполнена</option>
                            <option value='3'>Отменена</option>
                        </select>
                    </label>
                }
                <label>
                    <small>Ответственный</small>
                    <select 
                        name='responsible' 
                        className='input w-full border-light-blue' 
                        title='Ответственный' 
                        defaultValue={type === 'patch' ? `${task.responsible.id}` : '0' }
                        disabled={type === 'patch' && task.owner.id != user?.id ? true : false }
                    >
                        <option value="0">Выберите...</option>
                        {subordinates.map((subordinate, idx) => (
                            <option key={idx} value={`${subordinate?.id}`}>{subordinate.surname} {subordinate.name} {subordinate.middlename}</option>
                        ))}
                    </select>
                </label>
                <label>
                    <small>Дата окончания</small>
                    <input 
                        name='deadline'
                        type="date"
                        className='input w-full border-light-blue'
                        title='Дата окончания задачи'
                        defaultValue={type === 'patch' ? `${dateFormat(task?.deadline, "isoDateTime").split('T')[0]}` : ''}
                        required
                        disabled={type === 'patch' && task.owner.id != user?.id ? true : false }
                    />
                </label>
                <div className='flex items-center justify-end gap-2'>
                    <button className='btn btn-blue text-white' type='submit'>
                        {type === 'patch' ? 'Сохранить' : 'Создать'}
                    </button>
                </div>
            </Form>
            {type === 'patch' &&
                <Form onSubmit={() => setVisibleModal(false)} className='flex flex-col mt-4' method='delete' action='/task'>
                    <div className='flex items-center justify-end gap-2'>
                        <input name='taskId' type='hidden' value={id}/>
                        <button type='submit' className='btn btn-red text-white'>
                            Удалить
                        </button>
                    </div>
                </Form>
            }   
        </div>
    </div>
    )
}

export default ModalTasks