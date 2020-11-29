const TodoList = ({ todos, handleClick }) => {
  return (
    <ul className='todos-list'>
      {todos.map((todo, i) => (
        <li
          key={todo._id}
          className='todo-item'
          onClick={() => handleClick(todo._id)}
        >
          <div>
            <div
              className={todo.completed ? 'circle tick-mark' : 'circle'}
            ></div>
            <div>{todo.task}</div>
          </div>
          <div className='cross'></div>
        </li>
      ))}
    </ul>
  )
}

export default TodoList
