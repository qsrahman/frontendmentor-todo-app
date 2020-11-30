const TodoList = ({
  state,
  todos,
  handleClick,
  onDragStart,
  onDragOver,
  onDrop,
}) => {
  const createLi = (todo, i) => {
    return (
      <li
        key={todo._id}
        className='todo-item'
        onClick={() => handleClick(todo._id)}
        draggable='true'
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDrop={onDrop}
        data-position={i}
      >
        <div>
          <div
            className={
              todo.completed
                ? 'circle border-gradient tick-mark'
                : 'circle border-gradient'
            }
          ></div>
          <div>{todo.task}</div>
        </div>
        <div className='cross'></div>
      </li>
    )
  }

  const list = todos.map((todo, i) => {
    let li = null

    if (state === 0) {
      li = createLi(todo, i)
    } else if (state === 1 && !todo.completed) {
      li = createLi(todo, i)
    } else if (state === 2 && todo.completed) {
      li = createLi(todo, i)
    }

    return li
  })

  return <ul className='todos-list'>{list}</ul>
}

export default TodoList
