"use client"

import { useState } from "react"
import { Form, TodoList } from "@/src/components/dashboard"

interface TodoItem {
  id: number
  name: string
  status: boolean
}

export  function TaskPage() {
  const [todos, setTodos] = useState<TodoItem[]>([])
  const [newTodo, setNewTodo] = useState("")

  const addTodoHandler = () => {
    if (newTodo.trim() !== "") {
      const todo: TodoItem = {
        id: Date.now(),
        name: newTodo.trim(),
        status: false,
      }
      setTodos([...todos, todo])
      setNewTodo("")
    }
  }

  const deleteTodoHandler = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const checkTodoHandler = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, status: !todo.status } : todo)))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 dark:from-indigo-950 dark:via-gray-900 dark:to-purple-950 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-900 dark:text-indigo-100 mb-2">Task List</h1>
          <p className="text-indigo-600 dark:text-indigo-300">Stay organized and productive</p>
        </div>

        <Form addTodoHandler={addTodoHandler} newTodo={newTodo} setNewTodo={setNewTodo} />
        <TodoList todos={todos} deleteTodoHandler={deleteTodoHandler} checkTodoHandler={checkTodoHandler} />
      </div>
    </div>
  )
}
