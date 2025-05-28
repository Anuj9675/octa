"use client"
import { Todo } from "../todo"

interface TodoItem {
  id: number
  name: string
  status: boolean
}

interface TodoListProps {
  todos: TodoItem[]
  deleteTodoHandler: (id: number) => void
  checkTodoHandler: (id: number) => void
}

export const TodoList = ({ todos, deleteTodoHandler, checkTodoHandler }: TodoListProps) => {
  return (
    <div className="w-full min-h-[200px] p-6 bg-white dark:bg-indigo-950/30 mt-6 rounded-xl border border-indigo-100 dark:border-indigo-800 shadow-lg backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100">Your Tasks</h2>
        <span className="px-3 py-1 text-sm font-medium text-indigo-600 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/50 rounded-full">
          {todos.length} {todos.length === 1 ? "task" : "tasks"}
        </span>
      </div>

      <div className="space-y-3">
        {todos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 mb-4 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-indigo-900 dark:text-indigo-100 mb-2">No tasks yet</h3>
            <p className="text-indigo-500 dark:text-indigo-400">Add a task above to get started!</p>
          </div>
        ) : (
          todos.map((todo) => (
            <Todo
              key={todo.id}
              name={todo.name}
              status={todo.status}
              id={todo.id}
              deleteTodo={deleteTodoHandler}
              checkTodo={checkTodoHandler}
            />
          ))
        )}
      </div>
    </div>
  )
}
