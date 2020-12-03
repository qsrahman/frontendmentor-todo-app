import { useState, useEffect } from 'react'
import initTodos from './todos'
import TodoList from './components/TodoList'

const App = () => {
  const [todos, setTodos] = useState([])
  const [state, setState] = useState(0) // 0 = All, 1 = Active, 2 = Completed
  const [theme, setTheme] = useState('light')
  const [task, setTask] = useState('')

  const toggleTheme = () => {
    const tm = theme === 'light' ? 'dark' : 'light'
    setTheme(tm)
    document.documentElement.setAttribute('data-theme', tm)
  }

  const toggleTodo = id => {
    const idx = todos.findIndex(todo => todo._id === id)
    const newTodos = [...todos]

    newTodos[idx].completed = !newTodos[idx].completed
    setTodos(newTodos)
  }

  const removeTodo = id => {
    const idx = todos.findIndex(todo => todo._id === id)
    const newTodos = [...todos]

    if (idx !== -1) {
      newTodos.splice(idx, 1)
    }

    setTodos(newTodos)
  }

  const addTodo = e => {
    if (e.keyCode === 13) {
      if (task.trim() !== '') {
        const newTodo = {
          _id: Date.now(),
          task: task.trim(),
          completed: false,
        }
        setTodos([...todos, newTodo])
      }
      setTask('')
    }
  }

  const handleOnDragEnd = result => {
    if (!result.destination) return

    const items = [...todos]
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    setTodos(items)
  }

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos')
    setTodos(storedTodos !== null ? JSON.parse(storedTodos) : initTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  return (
    <div className='container'>
      <div className='header-image'></div>
      <main>
        <div className='app-title'>
          <h1>TODO</h1>
          <div className='theme-toggler' onClick={toggleTheme}></div>
        </div>
        <div className='input-todo'>
          <div>
            <div className='outer-circle'>
              <div className='circle'></div>
            </div>
          </div>
          <input
            type='text'
            value={task}
            onChange={e => setTask(e.target.value)}
            onKeyDown={addTodo}
            title='Create a new todo'
            placeholder='Create a new todo...'
          />
        </div>
        <div className='wrapper'>
          <TodoList
            state={state}
            todos={todos}
            toggleTodo={toggleTodo}
            removeTodo={removeTodo}
            handleOnDragEnd={handleOnDragEnd}
          />
          <footer>
            <div className='left'>
              <small>
                {todos.filter(item => !item.completed).length} items left
              </small>
            </div>
            <div className='middle-desktop'>
              <button
                className={state === 0 ? 'active' : ''}
                onClick={() => setState(0)}
              >
                All
              </button>
              <button
                className={state === 1 ? 'active' : ''}
                onClick={() => setState(1)}
              >
                Active
              </button>
              <button
                className={state === 2 ? 'active' : ''}
                onClick={() => setState(2)}
              >
                Completed
              </button>
            </div>
            <div className='right'>
              <button
                onClick={() => setTodos(todos.filter(item => !item.completed))}
              >
                Clear Completed
              </button>
            </div>
          </footer>
        </div>
        <div className='middle-mobile'>
          <button
            className={state === 0 ? 'active' : ''}
            onClick={() => setState(0)}
          >
            All
          </button>
          <button
            className={state === 1 ? 'active' : ''}
            onClick={() => setState(1)}
          >
            Active
          </button>
          <button
            className={state === 2 ? 'active' : ''}
            onClick={() => setState(2)}
          >
            Completed
          </button>
        </div>
        <div className='message'>
          <small>Drag and drop to reorder list</small>
        </div>
      </main>
    </div>
  )
}

export default App
