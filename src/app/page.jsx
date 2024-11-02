import { prisma } from "../libs/prisma";
import TaskCard from "../components/TaskCard";
async function loadTasks() {
  // const res = await fetch("http://localhost:3000/api/tasks")
  // const data = await res.json()
  const data = await prisma.task.findMany()
  console.log(data)
  return data
}
export default async function Home() {
  const tasks = await loadTasks()
  console.log(tasks)
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Tareas</h1>
      <div className="container mx-auto grid grid-cols-4 grid-rows-4 gap-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />

        ))}
      </div>
    </div>
  );
}
