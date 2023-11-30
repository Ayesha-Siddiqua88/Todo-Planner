import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './contexts'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {
  const [todos, setTodos] = useState([])


  const addTodo=(todo)=>{
    setTodos((prev)=>[{id:Date.now(),...todo},...prev])

  }

  const updateTodo=(id,todo)=>{
    setTodos((prev)=> prev.map ((prevTodo)=>(prevTodo.id === id? todo : prevTodo)))
  }

  // new array in such a way that contains the values or ids that are not deleted so map is not a nice way to complete this task
  const deleteTodo=(id)=>{
    setTodos((prev)=>prev.filter((todo)=>todo.id!==id))
  }


  const toggleComplete=(id)=>{
    setTodos((prev)=>prev.map((prevTodo)=>prevTodo.id===id ?
    {...prevTodo, completed:!prevTodo.completed}:prevTodo))
  }


  // all values that are already present should be disolayed first, for that we are using useeffecct
  // localstorage will store in string format but we need it in json format
  useEffect(()=>{
    const todos=JSON.parse(localStorage.getItem("todos"))
    if(todos && todos.length>0){
      setTodos(todos)
    }
  },[])

  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])




  return (
  <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
  <div className=" min-h-screen py-8 bg-cyan-950">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
            <h1 className="text-2xl font-bold text-center mb-8 mt-2">Planner</h1>
            <div className="mb-4">
                {/* Todo form goes here */} 
                <TodoForm/>
            </div>
            <div className="flex flex-wrap gap-y-3">
                {/*Loop and Add TodoItem here */}
                {todos.map((todo)=>(
                  <div key={todo.id}
                  className='w-full'
                  >
                    <TodoItem todo={todo}/>

                  </div>
                ))}
            </div>
        </div>
    </div>
    </TodoProvider>
  )
}

export default App

// bg-[#0F1D2A]
