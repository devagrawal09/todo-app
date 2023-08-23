import { TasksComponent } from './Todo'

export function Page() {
  return (
    <>
      <div className="flex gap-5 justify-between px-5 py-2">
        Hello there, Stranger
      </div>
      <main>
        <h1 className="text-[#ef4444] italic text-6xl text-center">todos</h1>
        <div className="w-1/2 min-w-[400px] bg-white border border-solid border-gray-300 rounded-lg m-auto card-shadow ">
          <TasksComponent />
        </div>
      </main>
    </>
  )
}
