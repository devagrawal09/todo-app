import { useQueryClient, useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { useState, FormEvent } from 'react'
import { Task } from '../models/Task'

export function TasksComponent() {
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const qc = useQueryClient()

  const { data: tasks, isLoading: tasksLoading } = useQuery<Task[]>(
    ['tasks'],
    () => []
  )

  async function addTask(e: FormEvent) {
    e.preventDefault()
  }

  return (
    <>
      <form
        onSubmit={addTask}
        className="border border-b border-solid flex px-2 py-1 items-center todo"
      >
        <input
          value={newTaskTitle}
          placeholder="What needs to be done?"
          onChange={(e) => setNewTaskTitle(e.target.value)}
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

  async function setCompleted(task: Task, completed: boolean) {}

  async function deleteTask(task: Task) {}

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
