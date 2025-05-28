"use client"

interface FormProps {
  addTodoHandler: () => void
  newTodo: string
  setNewTodo: (value: string) => void
}

export const Form = ({ addTodoHandler, newTodo, setNewTodo }: FormProps) => {
  return (
    <div className="w-full p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 rounded-xl border border-indigo-100 dark:border-indigo-800 shadow-lg">
      <div className="w-full flex items-center justify-center gap-4">
        <div className="relative flex-1">
          <input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            type="text"
            className="w-full py-4 px-4 pr-4 text-gray-900 dark:text-white bg-white dark:bg-indigo-900/50 border-2 border-indigo-200 dark:border-indigo-700 rounded-xl outline-none focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800 transition-all duration-200 placeholder:text-indigo-400 dark:placeholder:text-indigo-300"
            placeholder="What do you have planned today?"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTodoHandler()
              }
            }}
          />
        </div>
        <button
          onClick={addTodoHandler}
          className="px-8 py-4 font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
        >
          ADD
        </button>
      </div>
    </div>
  )
}
