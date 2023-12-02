import { FC, useState } from "react"
import DateGroupTasks from '../components/tasks/DateGroupTasks'
import ModalTasks from "../components/tasks/ModalTasks"
import TableTasks from "../components/tasks/TableTasks"
import { instance } from "../api/axios.api"
import { toast } from 'react-toastify'
import { useLoaderData } from "react-router-dom"
import { IResponseTaskData, ITaskData, ITaskGroupData } from "../types/types"

export const tasksAction = async ({ request }: any) => {

  switch(request.method) {
    case "POST": {
      const formData = await request.formData()
      const task = {
        title: formData.get('title'),
        description: formData.get('description'),
        deadline: formData.get('deadline'),
        priority: formData.get('priority'),
        responsible: {id: formData.get('responsible')}
      }

      try{
        await instance.post('task', task)
        toast.success('Задача создана')
      } catch (err: any) {
        const error = err.response?.data.message
        toast.error(error.toString())
      }

      return null
    }
    case "PATCH": {
      const formData = await request.formData()
      const task = {
        id: formData.get('id'),
        title: formData.get('title'),
        description: formData.get('description'),
        deadline: formData.get('deadline'),
        priority: formData.get('priority'),
        status: formData.get('status'),
        responsible: {id: formData.get('responsible')}
      }

      console.log(task)

      try{
        await instance.patch(`task/${task.id}`, task)
        toast.success('Задача обновлена')
      } catch (err: any) {
        const error = err.response?.data.message
        toast.error(error.toString())
      }

      return null
    }
    case "DELETE": {
      const formData = await request.formData()
      const taskId = formData.get('taskId')

      try{
        await instance.delete(`task/${taskId}`)
        toast.success('Задача удалена')
      } catch (err: any) {
        const error = err.response?.data.message
        toast.error(error.toString())
      }

      return null
    }
  }
}

export const tasksLoader = async () => {
  const allTasks = await instance.get<ITaskData[]>('task/group/all')
  const deadlineTasks = await instance.get<ITaskGroupData[]>('task/group/date')
  const bossTasks = await instance.get<ITaskData[]>('task/group/subordinates')

  const subordinates = await instance.get<ITaskData[]>(`user/subordinates`)

  const data = {
    allTasks: allTasks.data,
    bossTasks: bossTasks.data,
    deadlineTasks: deadlineTasks.data,
    subordinates: subordinates.data
  }
  return data
}

const Tasks: FC = () => {
  const [groupMode, setGroupMode] = useState<number>(0)
  const [visibleModal, setVisibleModal] = useState<boolean>(false)
  const [isPatch, setIsPatch] = useState<boolean>(false)
  const [taskId, setTaskId] = useState<number>(0)
  const [tasks, setTasks] = useState<ITaskData>()

  const statuses = ['К выполнению', 'Выполняется', 'Выполнена', 'Отменена']
  const priority = ['Низкий', 'Средний', 'Высокий']



  const { allTasks, bossTasks, deadlineTasks, subordinates } = useLoaderData() as IResponseTaskData
  
  
  return (
    <>
      <div className="flex flex-row justify-between items-center px-6 py-3 shadow-sm flex-wrap">
        <h2 className="text-2xl font-medium">Задачи</h2>
        <button 
          onClick={() => {
              setVisibleModal(true)
              setIsPatch(false)
            }
          } 
          className="btn btn-blue text-white"
        >
          Создать задачу
        </button>
      </div>

      <div className="flex flex-row items-center mt-8 px-6 gap-3 flex-wrap">
        <button 
          className={`btn border border-solid border-light-blue rounded-full ${groupMode == 0 ? 'bg-light-blue' : 'btn-white'}`} 
          onClick={() => setGroupMode(0)}
        >
          Все {allTasks.length}
        </button>
        <button 
          className={`btn border border-solid border-light-blue rounded-full ${groupMode == 1 ? 'bg-light-blue' : 'btn-white'}`} 
          onClick={() => setGroupMode(1)}
        >
          По дате завершения
        </button>
        <button 
          className={`btn border border-solid border-light-blue rounded-full ${groupMode == 2 ? 'bg-light-blue' : 'btn-white'}`} 
          onClick={() => setGroupMode(2)}
        >
          Подчиненных
        </button>
      </div>
      <div className="flex flex-row items-center mt-8 px-6 gap-3 flex-wrap">
        {
          groupMode == 0 ? 
            <TableTasks tasks={allTasks} setTaskId={setTaskId} setVisibleModal={setVisibleModal} setTasks={setTasks} setIsPatch={setIsPatch} statuses={statuses} priority={priority} /> : 
              (groupMode == 1 ? 
                <DateGroupTasks tasks={deadlineTasks} setTaskId={setTaskId} setVisibleModal={setVisibleModal} setTasks={setTasks} setIsPatch={setIsPatch} statuses={statuses} priority={priority} /> : 
                  <TableTasks tasks={bossTasks} setTaskId={setTaskId} setVisibleModal={setVisibleModal} setTasks={setTasks} setIsPatch={setIsPatch} statuses={statuses} priority={priority} />)
        }
      </div>
      { 
        (visibleModal && ( !isPatch ? <ModalTasks type='post' setVisibleModal={setVisibleModal} task={null} subordinates={subordinates} /> :
          //@ts-ignore
          <ModalTasks type='patch' id={taskId} setVisibleModal={setVisibleModal} task={tasks.find(tasks => tasks.id == taskId)} subordinates={subordinates} />
          )
        )
      }
    </>
  )
}

export default Tasks