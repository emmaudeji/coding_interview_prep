"use client"

import React, { useState, useEffect } from 'react';
import { text } from 'stream/consumers';

interface Task {
  id: number, text:string, completed:boolean
}

const TodoApp = () => {
  const [tasks, setTasks] = useState<Task[]>(()=>{
    const savedTasks = typeof window !== "undefined" ? localStorage.getItem('tasks') : null;
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
  });
  const [newTask, setNewTask] = useState<any>('');
  const [filter, setFilter] = useState('all');
  const [isEdit, setEdit] = useState(false);

  // Save tasks to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);
  
    const addTask = () => {
      if(!isEdit){
        if (newTask.trim() === '') return;
        setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      } else {
        // edit task
        setTasks(tasks.map(task=>
          task.id===newTask.id ? newTask : task
        ))
        setEdit(false)
      }
      setNewTask('');
    };
  
    const deleteTask = (id:number) => {
      setTasks(tasks.filter(task => task.id !== id));
    };
  
    const toggleTaskCompletion = (id:number) => {
      setTasks(tasks.map(task => (
        task.id === id ? { ...task, completed: !task.completed } : task
      )));
    };
  
    const filteredTasks = tasks?.filter(task => {
      if (filter === 'completed') return task.completed;
      if (filter === 'pending') return !task.completed;
      return true;
    });
  
    return (
      <div className="min-h-screen flex flex-col items-center p-4">
        <h1 className="text-4xl font-bold mb-6">Todo List</h1>
        <div className="w-full max-w-md">
          <input
            type="text"
            value={!isEdit ? newTask : newTask?.text}
            onChange={(e) => setNewTask( !isEdit ?  e.target.value : {...newTask, text:  e.target.value})}
            className="w-full bg-transparent p-2 mb-4 border border-gray-300/20 rounded"
            placeholder="Add a new task"
          />
          <button
            type='submit'
            onClick={addTask}
            className="w-full p-2 bg-blue-500 text-white rounded mb-4"
          >
            {!isEdit ? 'Add Task' : 'Edit Task'}
          </button>
          <div className="flex justify-around mb-4">
            <button
              onClick={() => setFilter('all')}
              className={`p-2 ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`p-2 ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
            >
              Completed
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`p-2 ${filter === 'pending' ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
            >
              Pending
            </button>
          </div>
          <ul>
            {filteredTasks?.map(task => (
              <li key={task.id} className="flex items-center justify-between p-2 border-b border-gray-300">
                <span
                  // onClick={() => toggleTaskCompletion(task.id)}
                  className={`cursor-pointer ${task.completed ? 'line-through' : ''}`}
                >
                  {task.text}
                </span>

                <div className="flex gap-2 items-center">
                  <button onClick={() => toggleTaskCompletion(task.id)} className="text-green-500">
                    Mark
                  </button>
                  <button onClick={() =>{ 
                    setNewTask(task)
                    setEdit(true)
                    }} className="text-blue-500">
                    Edit
                  </button>
                  <button onClick={() => deleteTask(task.id)} className="text-red-500">
                    Delete
                  </button>
                </div>
                
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };
  

export default TodoApp