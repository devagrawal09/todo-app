import { useQueryClient, useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { FormEvent } from 'react'
import { Task } from '../models/Task'
import { remult } from 'remult'

const todoRepo = remult.repo(Task)

export function TasksComponent() {
  const qc = useQueryClient()

  const { data: tasks, isLoading: tasksLoading } = useQuery(['tasks'], () =>
    todoRepo.find()
  )

  async function addTask(e: FormEvent) {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    // @ts-expect-error
    const title = form.title.value
    form.reset()

    try {
      await todoRepo.insert({ title })
      qc.invalidateQueries(['tasks'])

      form.reset()
    } catch (error: any) {
      alert(error.message)
    }
  }

  return (
    <>
      <form
        onSubmit={addTask}
        className="border border-b border-solid flex px-2 py-1 items-center todo"
      >
        <input
          name="title"
          placeholder="What needs to be done?"
          className="w-full p-1 outline-none placeholder:italic"
        />
        <button className="font-medium rounded-full border px-4 py-2 text-md font-sans bg-white border-none text-white hover:text-inherit hover:bg-gray-200">
          Add
        </button>
      </form>

      {tasksLoading && (
        <div className="flex">
          <div className="px-3 py-2 text-gray-500">Loading...</div>
        </div>
      )}

      {tasks?.length ? (
        tasks.map((task) => <TaskComponent task={task} key={task.id} />)
      ) : (
        <div className="flex">
          <div className="px-3 py-2 text-gray-500">No tasks found</div>
        </div>
      )}
    </>
  )
}

function TaskComponent({ task }: { task: Task }) {
  const qc = useQueryClient()

  async function setCompleted(task: Task, completed: boolean) {
    try {
      task.completed = completed
      await todoRepo.save(task)
      qc.invalidateQueries(['tasks'])
    } catch (error: any) {
      alert(error.message)
    }
  }

  async function deleteTask(task: Task) {
    try {
      await todoRepo.delete(task)
      qc.invalidateQueries(['tasks'])
    } catch (error: any) {
      alert(error.message)
    }
  }

  return (
    <div className="border-b flex px-2 py-1 gap-4 items-center todo">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={(e) => setCompleted(task, e.target.checked)}
        className="w-5 h-5"
      />
      <span className={clsx('p-1 grow', task.completed && 'line-through')}>
        {task.title}
      </span>
      <button
        onClick={() => deleteTask(task)}
        className="font-medium rounded-full border px-4 py-2 text-md font-sans bg-white border-none text-white hover:text-inherit hover:bg-gray-200"
      >
        x
      </button>
    </div>
  )
}
