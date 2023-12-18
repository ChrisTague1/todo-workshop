import { useEffect, useState } from 'react'
import './App.css'
import { createClient } from '@supabase/supabase-js'

const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpc2NzZ2xreWF1ZnZ5cnJjbnF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc1ODYyODksImV4cCI6MjAxMzE2MjI4OX0.H_SyyADD3mv7pSEpoIWPyFPrHwZLhxvTe8WilJAva18'
const supabaseUrl = 'https://discsglkyaufvyrrcnqw.supabase.co'
const supabase = createClient(supabaseUrl, supabaseKey)

function App() {
  const [value, setValue] = useState('')
  const [todos, setTodos] = useState([])

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    let { data } = await supabase
      .from('todos')
      .select('*')

    setTodos(data || [])
  }

  const click = async () => {
    await supabase
      .from('todos')
      .insert([
        {todo: value},
      ])
      .select();
    setValue('');

    await fetchTodos()
  }

  const change = (event) => {
    setValue(event.target.value)
  }

  const deleteTodo = async (id) => {
    await supabase
      .from('todos')
      .delete()
      .eq('id', id)
  }

  return (
    <>
      <h1>A Really Cool Todo App</h1>
      <div className='card'>
        <input onChange={change} type='text' value={value}/>
        <button onClick={click}>
          Add Todo
        </button>
      </div>

      {todos.map((todo) => (
        <div
          className='card'
          key={todo.id}
        >
          {todo.todo}
          <button onClick={() => deleteTodo(todo.id)}>
            Delete Todo
          </button>
        </div>
      ))}
    </>
  )
}

export default App
