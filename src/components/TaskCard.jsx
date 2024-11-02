"use client"
import { useRouter } from "next/navigation"
function TaskCard({ task }) {
    const router = useRouter()
  return (
    <div className="text-sm p-4 border border-white rounded-md cursor-pointer hover:bg-slate-500" onClick={() => router.push(`/tasks/edit/${task.id}`)}>
            <h2 className="text-2xl font-bold">{task.title}</h2>
            <p>{task.description}</p>
            <p>{new Date(task.createdAt).toLocaleString()}</p>
          </div>
  )
}

export default TaskCard