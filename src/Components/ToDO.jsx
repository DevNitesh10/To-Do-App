import { useEffect, useRef, useState } from 'react';
import './CSS/Todo.css';
import ToDoItems from './ToDoItems';

const ToDO = () => {
    const [todos, setTodos] = useState([]);
    const inputRef = useRef(null);

    let count = 0;
    const add = () =>{
        setTodos([...todos, {no:count++, text:inputRef.current.value, display:""}])
        inputRef.current.value = "";
        localStorage.setItem("todos_count", count)

    }
    useEffect(() => {
        setTodos(JSON.parse(localStorage.getItem("todos")))
        count = localStorage.getItem("todos_count")
    }, [])

    useEffect(() => {
        setTimeout(() => {
            console.log(todos);
            localStorage.setItem("todos", JSON.stringify(todos));
        }, 100);
    }, [todos])

  return (
    <div className='todo'>
        <div className='todo-header'>To-Do List</div>
        <div className="todo-add">
            <input ref={inputRef} type="text" placeholder='Add Your Task' className='todo-input' />
            <div onClick={() => {add()}} className="todo-add-btn">Add</div>
        </div>
        <div className="todo-list">
        {todos.map((item, index) => {
            return <ToDoItems  setTodos={setTodos} no={item.no} text={item.text} display={item.display} key={index} />
        })}
        </div>
    </div>
  )
}

export default ToDO