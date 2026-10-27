import { useState } from 'react'

function App() {
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const text = inputValue.trim()

    if (!text) return

    setTodos((currentTodos) => [
      ...currentTodos,
      { id: crypto.randomUUID(), text, completed: false },
    ])
    setInputValue('')
  }

  const toggleTodo = (id) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  const deleteTodo = (id) => {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id))
  }

  const completedCount = todos.filter((todo) => todo.completed).length

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-100 via-indigo-50 to-sky-100 px-4 py-12 sm:px-6 sm:py-20">
      <section className="mx-auto max-w-xl overflow-hidden rounded-3xl bg-white shadow-xl shadow-indigo-950/10 ring-1 ring-slate-900/5">
        <header className="bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-5 text-white sm:px-8 sm:py-6">
          <h1 className="text-2xl font-bold tracking-tight">
            My Todo List
          </h1>
          <p className="mt-1 text-sm text-indigo-100">
            Small steps add up. What would you like to get done?
          </p>
        </header>

        <div className="p-6 sm:p-9">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
            <label htmlFor="new-todo" className="sr-only">
              New task
            </label>
            <input
              id="new-todo"
              type="text"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              placeholder="Add a new task..."
              className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Add task
            </button>
          </form>

          <div className="mt-8 flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-semibold text-slate-700">Tasks</h2>
            {todos.length > 0 && (
              <p className="text-sm text-slate-500" aria-live="polite">
                {completedCount} of {todos.length} completed
              </p>
            )}
          </div>

          {todos.length > 0 ? (
            <ul className="divide-y divide-slate-100">
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className="group flex items-center gap-3 py-4 first:pt-4"
                >
                  <input
                    id={`todo-${todo.id}`}
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="size-5 shrink-0 cursor-pointer rounded border-slate-300 accent-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  />
                  <label
                    htmlFor={`todo-${todo.id}`}
                    className={`min-w-0 flex-1 cursor-pointer break-words text-sm sm:text-base ${
                      todo.completed
                        ? 'text-slate-400 line-through'
                        : 'text-slate-700'
                    }`}
                  >
                    {todo.text}
                  </label>
                  <button
                    type="button"
                    onClick={() => deleteTodo(todo.id)}
                    aria-label={`Delete ${todo.text}`}
                    className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-300 sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="py-10 text-center">
              <div className="mx-auto grid size-12 place-items-center rounded-full bg-indigo-50 text-indigo-600">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="size-6"
                >
                  <path
                    d="m8 12 2.5 2.5L16 9m5 3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                  />
                </svg>
              </div>
              <p className="mt-4 font-medium text-slate-700">You’re all caught up</p>
              <p className="mt-1 text-sm text-slate-500">
                Add a task above to get started.
              </p>
            </div>
          )}
        </div>
      </section>
      <p className="mt-6 text-center text-sm text-slate-500">
        One task at a time.
      </p>
    </main>
  )
}

export default App