import { FC} from 'react'
import { ITasks } from '../../types/types'
import dateFormat from "dateformat"
import { dateDifference } from '../../helpers/date.helper'


const TableTasks: FC<ITasks> = ({tasks, setTaskId, setVisibleModal, setTasks, setIsPatch, statuses, priority}) => {

  return (
    <>
      <div className='flex flex-col w-full'>
        <table className='w-full'>
          <thead>
            <tr>
              <td className='font-bold w-1/4'>Заголовок</td>
              <td className='font-bold w-1/6'>Приоритет</td>
              <td className='font-bold w-1/6'>Дата окончания</td>
              <td className='font-bold w-1/4'>Ответственный</td>
              <td className='font-bold w-1/6'>Статус</td>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, idx) => (
              <tr
                key={idx}
                className={`px-2 py-2 ${idx % 2 ? '' : 'odd:bg-light-blue'}`}
              >
                <td 
                  onClick={() => {
                      setTaskId(task.id)
                      setVisibleModal(true)
                      setIsPatch(true)
                      //@ts-ignore
                      setTasks(tasks)
                    }
                  }
                  className={`cursor-pointer font-medium ${ task.status == 2 ? 'text-green-600' : ( dateDifference(task.deadline) ? 'text-red-500' : 'text-gray-500')}`}
                >
                  {task.title}
                </td>
                <td>
                  {priority[task.priority]}
                </td>
                <td>
                  {dateFormat(task.deadline, 'dd.mm.yyyy')}
                </td>
                <td>
                  {task.responsible.surname + ' ' + task.responsible.name + ' ' + task.responsible.middlename}
                </td>
                <td>
                  {statuses[task.status]}
                </td>
              </tr>
            ))}
            {
                (!tasks.length &&
                <tr>  
                    <td colSpan={5} className='text-center'>
                        Задачи отсутствуют
                    </td>
                </tr>    
                )
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default TableTasks