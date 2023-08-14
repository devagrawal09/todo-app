import { FormEvent, useState } from 'react'
import { Task } from '../models/Task'
import { remult } from 'remult'
import { useQuery, useQueryClient } from 'react-query'
import { useUser } from '@clerk/clerk-react'

const todosRepo = remult.repo(Task)

export default function Todo() {
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const qc = useQueryClient()
  const { user } = useUser()

  const { data: tasks, isLoading } = useQuery('tasks', () => todosRepo.find({}))

  async function addTask(e: FormEvent) {
    e.preventDefault()
    try {
      await todosRepo.insert({
        title: newTaskTitle,
        completed: false,
        createdAt: new Date(),
        userId: user?.id,
      })
      qc.invalidateQueries('tasks')
      setNewTaskTitle('')
    } catch (error: any) {
      alert(error.message)
    }
  }

  async function setCompleted(task: Task, completed: boolean) {
    try {
      await task.toggleCompleted(completed)

      qc.invalidateQueries('tasks')
    } catch (error: any) {
      alert(error.message)
    }
  }

  async function deleteTask(task: Task) {
    try {
      await todosRepo.delete(task.id)
      qc.invalidateQueries('tasks')
    } catch (error: any) {
      alert(error.message)
    }
  }

  return (
    <main>
      <h1>todos</h1>
      <div className="todos">
        <form onSubmit={addTask}>
          <input
            value={newTaskTitle}
            placeholder="What needs to be done?"
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          <button className="btn">Add</button>
        </form>

        {isLoading && <div>Loading...</div>}

        {tasks?.map((task) => (
          <div className="flex" key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={(e) => setCompleted(task, e.target.checked)}
            />
            <span>{task.title}</span>
            <button onClick={() => deleteTask(task)} className="btn">
              x
            </button>
          </div>
        ))}
      </div>
    </main>
  )
}
