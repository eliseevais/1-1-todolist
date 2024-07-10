import React, {ChangeEvent, useState} from 'react'
import {todolistsAPI} from "../api/todolists-api";

export default {
  title: 'API',
}

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null);
  const getTodolistHandler = () => {
    todolistsAPI.getTodolists()
      .then((res) => {
        setState(res.data)
      })
  };

  return (
    <div>
      <button onClick={getTodolistHandler}>get todolists</button>
      <div>{JSON.stringify(state)}</div>
    </div>
  )
}

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);
  const [todolistTitle, setTodolistTitle] = useState<string>('')

  const newTodolistTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTodolistTitle(event.currentTarget.value)
  };
  const createTodolistHandler = () => {
    todolistsAPI.createTodolist(todolistTitle)
      .then((res) => {
        setState(res.data)
      });
    setTodolistTitle('')
  };

  return (
    <div>
      <input placeholder={'enter new todolist title'} value={todolistTitle}
             onChange={newTodolistTitleHandler}/>
      <button onClick={createTodolistHandler}>create todolist</button>
      <div>{JSON.stringify(state)}</div>
    </div>
  )
}

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>('')

  const getTodolistHandler = () => {
    todolistsAPI.getTodolists()
      .then(res => {
        setState(res.data)
      });
  };
  const inputTodolistHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTodolistId(event.currentTarget.value)
  };
  const deleteTodolistHandler = () => {
    todolistsAPI.deleteTodolist(todolistId)
      .then(res => {
        setState(res.data)
      });
    setTodolistId('')
  };

  return (
    <div>
      <div>
        <button onClick={getTodolistHandler}>get todolists</button>
      </div>
      <div>
        <input placeholder={'enter todolistId to delete'} value={todolistId}
               onChange={inputTodolistHandler}/>
        <button onClick={deleteTodolistHandler}>delete todolist</button>
      </div>
      <div>{JSON.stringify(state)}</div>
    </div>
  )
}

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>('');
  const [title, setTitle] = useState<string>('')

  const getTodolistHandler = () => {
    todolistsAPI.getTodolists()
      .then(res => {
        setState(res.data)
      })
  };
  const inputChangeTodolistTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTodolistId(event.currentTarget.value)
  };
  const inputTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }
  const updateTodolistTitleHandler = () => {
    todolistsAPI.updateTodolist(todolistId, title)
      .then((res) => {
        setState(res.data)
      });
    setTodolistId('');
    setTitle('')
  };

  return (
    <div>
      <div>
        <button onClick={getTodolistHandler}>get todolists</button>
      </div>
      <div>
        <input placeholder={'enter todolistId'}
               value={todolistId} onChange={inputChangeTodolistTitleHandler}/>
        <input placeholder={'enter new todolist title'} value={title}
               onChange={inputTitleHandler}/>
        <button onClick={updateTodolistTitleHandler}>update todolist title
        </button>
      </div>
      <div>{JSON.stringify(state)}</div>
    </div>
  )
}

export const GetTasks = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>('');

  const getTodolistHandler = () => {
    todolistsAPI.getTodolists()
      .then(res => {
        setState(res.data)
      })
  };
  const inputGetTasksHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTodolistId(event.currentTarget.value)
  };
  const getTasksHandler = () => {
    todolistsAPI.getTasks(todolistId)
      .then(res => {
        setState(res.data)
      })
  };

  return (
    <div>
      <div>
        <button onClick={getTodolistHandler}>get todolists</button>
      </div>
      <div>
        <input placeholder={'enter todolistId'} value={todolistId}
               onChange={inputGetTasksHandler}/>
        <button onClick={getTasksHandler}>get tasks</button>
      </div>
      <div>{JSON.stringify(state)}</div>
    </div>
  )
}

export const CreateTask = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>('');
  const [taskTitle, setTaskTitle] = useState<string>('')

  const getTodolistHandler = () => {
    todolistsAPI.getTodolists()
      .then(res => {
        setState(res.data)
      })
  };
  const inputGetTasksHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTodolistId(event.currentTarget.value)
  };
  const getTasksHandler = () => {
    todolistsAPI.getTasks(todolistId)
      .then(res => {
        setState(res.data)
      })
  };
  const inputCreateTaskHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.currentTarget.value)
  };
  const createTaskHandler = () => {
    todolistsAPI.createTask(todolistId, taskTitle)
      .then((res) => {
        setState(res.data)
      });
    setTaskTitle('');
  };

  return (
    <div>
      <div>
        <button onClick={getTodolistHandler}>get todolists</button>
      </div>
      <div>
        <input placeholder={'enter todolistId'} value={todolistId}
               onChange={inputGetTasksHandler}/>
        <button onClick={getTasksHandler}>get tasks</button>
      </div>
      <input placeholder={'enter new Task title'} value={taskTitle}
             onChange={inputCreateTaskHandler}/>
      <button onClick={createTaskHandler}>create task</button>
      <div>{JSON.stringify(state)}</div>
    </div>
  )
}

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>('');
  const [taskId, setTaskId] = useState<string>('');

  const getTodolistHandler = () => {
    todolistsAPI.getTodolists()
      .then(res => {
        setState(res.data)
      })
  };
  const inputTodolistHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTodolistId(event.currentTarget.value)
  };
  const inputTaskHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskId(event.currentTarget.value)
  };
  const deleteTaskHandler = () => {
    todolistsAPI.deleteTask(todolistId, taskId)
      .then((res) => {
        setState(res.data)
      });
    setTaskId('');
  };
  const getTasksHandler = () => {
    todolistsAPI.getTasks(todolistId)
      .then(res => {
        setState(res.data)
      })
  };

  return (
    <div>
      <div>
        <button onClick={getTodolistHandler}>get todolists</button>
      </div>
      <div>
        <input value={todolistId} placeholder={'todolistId'}
               onChange={inputTodolistHandler}/>
        <button onClick={getTasksHandler}>get tasks</button>
      </div>
      <input value={taskId} placeholder={'taskId'} onChange={inputTaskHandler}/>
      <button onClick={deleteTaskHandler}>delete task</button>
      <div>{JSON.stringify(state)}</div>
    </div>)

}

export const UpdateTask = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>('');

  const [taskId, setTaskId] = useState<string>('');
  const [title, setTitle] = useState<string>('NEW TITLE_1');
  const [description, setDescription] = useState<string>('description_1');
  const [status, setStatus] = useState<number>(0);
  const [priority, setPriority] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>('');
  const [deadline, setDeadline] = useState<string>('');


  const getTodolistHandler = () => {
    todolistsAPI.getTodolists()
      .then(res => {
        setState(res.data)
      })
  };
  const inputTodolistHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTodolistId(event.currentTarget.value)
  };
  const getTasksHandler = () => {
    todolistsAPI.getTasks(todolistId)
      .then(res => {
        setState(res.data)
      })
  };
  const inputTaskHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskId(event.currentTarget.value)
  };
  const updateTaskHandler = () => {
    todolistsAPI.updateTask(todolistId, taskId, {
      title: title,
      description: description,
      priority: priority,
      status: status,
      startDate: '',
      deadline: ''
    })
      .then((res) => {
        setState(res.data)
      })
  }

  return (
    <div>
      <div>
        <button onClick={getTodolistHandler}>get todolists</button>
      </div>
      <div>
        <input value={todolistId} placeholder={'todolistId'}
               onChange={inputTodolistHandler}/>
        <button onClick={getTasksHandler}>get tasks</button>
      </div>
      <input value={taskId} placeholder={'taskId'}
             onChange={inputTaskHandler}
      />

      <input placeholder={'Task title'} value={title}
             onChange={(event) => {
               setTitle(event.currentTarget.value)
             }}/>
      <input placeholder={'description'} value={description}
             onChange={(event) => {
               setDescription(event.currentTarget.value)
             }}/>
      <input placeholder={'status'} value={status} type={'number'}
             onChange={(event) => {
               setStatus(+event.currentTarget.value)
             }}/>
      <input placeholder={'priority'} value={priority} type={'number'}
             onChange={(event) => {
               setPriority(+event.currentTarget.value)
             }}/>
      <button onClick={updateTaskHandler}>update task</button>
      <div>{JSON.stringify(state)}</div>
    </div>
  )
}