import { useState, useEffect } from 'react'
import initTodos from './todos'
import TodoList from './components/TodoList'

const App = () => {
  const [allTodos, setAllTodos] = useState(initTodos)
  const [currentTodos, setCurrentTodos] = useState(initTodos)
  const [state, setState] = useState(0) // 0 = All, 1 = Active, 2 = Completed
  const [theme, setTheme] = useState('light')
  const [task, setTask] = useState('')

  const toggleTheme = () => {
    const tm = theme === 'light' ? 'dark' : 'light'
    setTheme(tm)
    document.documentElement.setAttribute('data-theme', tm)
  }

  const handleClick = id => {
    const idx = allTodos.findIndex(todo => todo._id === id)
    const newTodos = [...allTodos]
    newTodos[idx].completed = !newTodos[idx].completed
    setAllTodos(newTodos)
  }

  const addTodo = e => {
    if (e.keyCode === 13) {
      const newTodo = {
        _id: Date.now(),
        task,
        completed: false,
      }
      setAllTodos([...allTodos, newTodo])
      setTask('')
    }
  }

  const clearCompleted = () => {
    const newTodos = allTodos.filter(item => !item.completed)
    setAllTodos(newTodos)
  }

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos')

    if (storedTodos !== null) {
      setAllTodos(JSON.parse(storedTodos))
    } else {
      setAllTodos(initTodos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(allTodos))
  }, [allTodos])

  useEffect(() => {
    if (state === 0) {
      setCurrentTodos(allTodos)
    } else if (state === 1) {
      setCurrentTodos(allTodos.filter(item => !item.completed))
    } else if (state === 2) {
      setCurrentTodos(allTodos.filter(item => item.completed))
    }
  }, [allTodos, state])

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
            <div className='circle'></div>
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
          <TodoList todos={currentTodos} handleClick={handleClick} />
          <footer>
            <div className='left'>
              <small>
                {allTodos.filter(item => !item.completed).length} items left
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
              <button onClick={clearCompleted}>Clear Completed</button>
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
