import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const TodoList = ({ state, todos, handleClick, handleOnDragEnd }) => {
  const createLi = (todo, i) => {
    return (
      <Draggable key={todo._id} draggableId={todo._id.toString()} index={i}>
        {provided => (
          <li
            className='todo-item'
            onClick={() => handleClick(todo._id)}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div>
              <div
                className={todo.completed ? 'circle tick-mark' : 'circle'}
              ></div>
              <div>{todo.task}</div>
            </div>
            <div className='cross'></div>
          </li>
        )}
      </Draggable>
    )
  }

  // TODO: react-beautiful-dnd give message => Detected non-consecutive <Draggable /> indexes.
  // The reason is that to preserve the user reordring of the todos this function should
  // return the original array ...

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

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId='todos-list'>
        {provided => (
          <ul
            className='todos-list'
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {list}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default TodoList
