import { FC } from 'react'
import { ITasksGroup } from '../../types/types'
import TableTasks from './TableTasks'


const DateGroupTasks: FC<ITasksGroup> = ({tasks, setTaskId, setVisibleModal, setTasks, setIsPatch, statuses, priority}) => {
  const type = ['Сегодня', 'На неделе', 'В будущем']

  return (
    <>
      {tasks.map((group, idx) => (
        <div className='flex flex-col w-full'>
          <h2 key={idx} className='text-lg py-2 font-bold'>{type[idx]}</h2>
          {//@ts-ignore
          <TableTasks tasks={group} setTaskId={setTaskId} setVisibleModal={setVisibleModal} setTasks={setTasks} setIsPatch={setIsPatch}  statuses={statuses} priority={priority} />
          }
        </div>
      ))}
    </>
  )
}

export default DateGroupTasks
