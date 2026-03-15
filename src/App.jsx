import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

function App() {

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [finished, setFinished] = useState(true);

  useEffect(() => {
    let todos = JSON.parse(localStorage.getItem("todos"));
    setTodos(todos);
  }, [])

  const saveTodo = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const handleSave = () => {
    setTodos([
      ...todos,
      { id: uuidv4(), todo, isCompleted: false }
    ]);
    setTodo("");
    console.log(todos);
    saveTodo();
  }

  const handleChange = (e) => {
    setTodo(e.target.value);
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveTodo();
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveTodo();
  }

  const handleCheck = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id == id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveTodo();
  }

  const toggleFinish = (p) => {
    setFinished(!finished)
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-sm p-5 bg-violet-100 min-h-[80vh] md:w-1/2">
        <div className="text-title bg-violet-700 p-3">
          <h2 className='text-sm md:text-xl font-bold text-white text-center'>Hey, Your Good Day Starts Now with iTask🎉</h2>
          <p className='text-sm bg text-center text-white'>Have a Great Day😊</p>
        </div>
        <div className='add-todo my-5'>
          <h2 className='text-lg font-bold'>
            Add a Todo
          </h2>
          <div className='mt-1.5 flex w-full'>
            <input
              type="text"
              placeholder="Today's Task..."
              className='flex-1 border-2 
            rounded p-1 border-violet-300 
            focus:outline-0 focus:border-violet-700 text-violet-800'
              onChange={handleChange}
              value={todo}
            />

            <button
              className='bg-violet-700 
          hover:bg-violet-800 
          p-3 py-1.5 text-white 
          rounded hover:cursor-pointer 
          mx-2 disabled:bg-violet-300'
              onClick={handleSave}
              disabled={todo.length < 5}
            >
              Save Task
            </button>
          </div>
        </div>
        <input className='items-end' type="checkbox" onChange={toggleFinish} checked={finished} name='' id='check' /> Show Finished
        <hr className='border text-gray-500 mt-0.5 mb-1' />
        <h2 className='text-lg font-bold'>Your Todos📝</h2>
        <div className="todos">
          {todos.length == 0 && <div className=''>No Todos to Display</div>}
          {
            todos.map(item => {
              return ((finished || !item.isCompleted) &&
                <div key={item.id} className="todo flex w-full mt-2 mb-2 justify-between items-center">
                  <div className='flex gap-4'>
                    <input type="checkbox" onChange={handleCheck} checked={item.isCompleted} name={item.id} id='check' />
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>
                  <div className="btns flex h-full">
                    <button className='bg-violet-700 hover:bg-violet-800 p-3 py-2 text-white rounded hover:cursor-pointer mx-1' onClick={(e) => { handleEdit(e, item.id) }}>
                      <FaRegEdit />
                    </button>
                    <button className='bg-violet-700 hover:bg-violet-800 p-3 py-2 text-white rounded hover:cursor-pointer mx-1' onClick={(e) => { handleDelete(e, item.id) }}>
                      <MdDeleteOutline />
                    </button>
                  </div>
                </div>)
            })
          }
        </div>
      </div>
    </>
  )
}

export default App