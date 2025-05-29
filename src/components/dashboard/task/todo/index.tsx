"use client"
import { FaTrashAlt, FaRegCircle, FaCheckCircle } from "react-icons/fa"

interface TodoProps {
  id: number
  name: string
  status: boolean
  checkTodo: (id: number) => void
  deleteTodo: (id: number) => void
}

export const Todo = ({ id, name, status, checkTodo, deleteTodo }: TodoProps) => {
  return (
    <div
      className={`group w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-md ${
        status
          ? "bg-indigo-50 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-800"
          : "bg-white dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-700 hover:border-indigo-300 dark:hover:border-indigo-600"
      }`}
    >
      <div className="flex items-center gap-4 flex-1">
        <button onClick={() => checkTodo(id)} className="flex-shrink-0 transition-all duration-200 hover:scale-110">
          {status ? (
            <FaCheckCircle className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          ) : (
            <FaRegCircle className="w-6 h-6 text-indigo-400 dark:text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-300" />
          )}
        </button>

        <div className={`flex-1 transition-all duration-300 ${status ? "line-through opacity-60" : ""}`}>
          <h3
            className={`text-lg font-medium ${
              status ? "text-indigo-500 dark:text-indigo-400" : "text-indigo-900 dark:text-indigo-100"
            }`}
          >
            {name}
          </h3>
        </div>
      </div>

      <button
        onClick={() => deleteTodo(id)}
        className="flex-shrink-0 p-2 text-indigo-400 hover:text-red-500 dark:text-indigo-500 dark:hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-all duration-200 opacity-0 group-hover:opacity-100"
      >
        <FaTrashAlt className="w-5 h-5" />
      </button>
    </div>
  )
}
