import React, {ChangeEvent, useEffect, useState} from 'react'
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
  // useEffect(() => {
  //   todolistsAPI.createTodolist('TEST3')
  //     .then((res) => {
  //       setState(res.data)
  //     })
  // }, [])
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
  // useEffect(() => {
  //   const todolistId = '0c9409d9-cb43-4f35-99aa-551e57a9b08d';
  //   todolistsAPI.deleteTodolist(todolistId)
  //     .then((res) => {
  //       setState(res.data)
  //     })
  // }, [])

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

  // useEffect(() => {
  //   const todolistId = '983f5bf6-49a9-4b27-b899-59264f974626';
  //   const title = 'TEST6';
  //   todolistsAPI.updateTodolist(todolistId, title)
  //     .then((res) => {
  //       setState(res.data)
  //     })
  // }, [])

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

  // useEffect(() => {
  //   const todolistId = '553574ab-2a76-4ff2-8129-07dbb0459776';
  //   todolistsAPI.getTasks(todolistId)
  //     .then((res) => {
  //       setState(res.data)
  //     })
  // }, [])

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
  const [title, setTitle] = useState<string>('')

  // useEffect(() => {
  //   const todolistId = '553574ab-2a76-4ff2-8129-07dbb0459776';
  //   const title = 'TEST_TASK_2';
  //   todolistsAPI.createTask(todolistId, title)
  //     .then((res) => {
  //       setState(res.data)
  //     })
  // }, []);

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
    setTitle(event.currentTarget.value)
  };
  const createTaskHandler = () => {
    todolistsAPI.createTask(todolistId, title)
      .then((res) => {
        setState(res.data)
      });
    setTodolistId('');
    setTitle('');
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
      <input placeholder={'enter new task title'} value={title}
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
  const [title, setTitle] = useState<string>('');


  // useEffect(() => {
  //   const todolistId = '553574ab-2a76-4ff2-8129-07dbb0459776';
  //   const taskId = 'df4f64dd-8ec1-4bd1-ad6d-fff031592b7d';
  //   const title = 'TEST_TASK_UPDATE_2';
  //   todolistsAPI.updateTask(todolistId, taskId, title)
  //     .then((res) => {
  //       setState(res.data)
  //     })
  // }, []);

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
  const inputCreateTaskHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  };
  const updateTaskTaskTitleHandler = () => {
    todolistsAPI.updateTask(todolistId, taskId, title)
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
      <input value={taskId} placeholder={'taskId'} onChange={inputTaskHandler}/>

      <input placeholder={'enter new task title'} value={title}
             onChange={inputCreateTaskHandler}/>
      <button onClick={updateTaskTaskTitleHandler}>update task title</button>
      <div>{JSON.stringify(state)}</div>
    </div>
  )
}