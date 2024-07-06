import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography
} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolists-api";
import {AddItemForm} from "../features/AddItemForm";
import {Todolist} from "../todolist/Todolist";

export type FilterValueType = 'all' | 'active' | 'completed';
export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValueType;
};
export type TasksStateType = {
  [key: string]: Array<TaskType>
};

function useTodolists() {

}

function useTasks() {

}

function App() {
  let todolistID01 = v1();
  let todolistID02 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    {id: todolistID01, title: 'What to learn', filter: 'all'},
    {id: todolistID02, title: 'What to buy', filter: 'all'},
  ]);

  let [tasksObj, setTasksObj] = useState<TasksStateType>({
    [todolistID01]: [
      {
        id: v1(),
        title: "HTML&CSS",
        status: TaskStatuses.Completed,
        startDate: '',
        description: '',
        deadline: '',
        todoListId: todolistID01,
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low
      },
      {
        id: v1(),
        title: "JS",
        status: TaskStatuses.Completed,
        startDate: '',
        description: '',
        deadline: '',
        todoListId: todolistID01,
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low
      },
      {
        id: v1(),
        title: "ReactJS",
        status: TaskStatuses.New,
        startDate: '',
        description: '',
        deadline: '',
        todoListId: todolistID01,
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low
      },
      {
        id: v1(),
        title: "Rest API",
        status: TaskStatuses.New,
        startDate: '',
        description: '',
        deadline: '',
        todoListId: todolistID01,
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low
      },
      {
        id: v1(),
        title: "GraphQL",
        status: TaskStatuses.New,
        startDate: '',
        description: '',
        deadline: '',
        todoListId: todolistID01,
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low
      }
    ],
    [todolistID02]: [
      {
        id: v1(),
        title: "Milk",
        status: TaskStatuses.New,
        startDate: '',
        description: '',
        deadline: '',
        todoListId: todolistID02,
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low
      },
      {
        id: v1(),
        title: "Tea",
        status: TaskStatuses.New,
        startDate: '',
        description: '',
        deadline: '',
        todoListId: todolistID02,
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low
      },
      {
        id: v1(),
        title: "Water",
        status: TaskStatuses.New,
        startDate: '',
        description: '',
        deadline: '',
        todoListId: todolistID02,
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low
      },
      {
        id: v1(),
        title: "Book",
        status: TaskStatuses.New,
        startDate: '',
        description: '',
        deadline: '',
        todoListId: todolistID02,
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low
      },
      {
        id: v1(),
        title: "Paper",
        status: TaskStatuses.New,
        startDate: '',
        description: '',
        deadline: '',
        todoListId: todolistID02,
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low
      },
    ]
  });

  function removeTask(id: string, todolistId: string) {
    let tasks = tasksObj[todolistId]
    let filteredTasks = tasks.filter(task => task.id !== id);
    tasksObj[todolistId] = filteredTasks;
    setTasksObj({...tasksObj});
  }

  function addTask(title: string, todolistId: string) {
    let newTask = {
      id: v1(),
      title: title,
      status: TaskStatuses.New,
      todolistId: todolistId,
      startDate: '',
      description: '',
      deadline: '',
      todoListId: todolistID02,
      addedDate: '',
      order: 0,
      priority: TaskPriorities.Low
    };
    let tasks = tasksObj[todolistId];
    let newTasks = [newTask, ...tasks];
    tasksObj[todolistId] = newTasks;
    setTasksObj({...tasksObj});
  }

  function changeTaskStatus(taskId: string, status: TaskStatuses, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let task = tasks.find(task => task.id === taskId);
    if (task) {
      task.status = status;
      setTasksObj({...tasksObj});
    }
  }

  function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let task = tasks.find(task => task.id === taskId);
    if (task) {
      task.title = newTitle;
      setTasksObj({...tasksObj});
    }
  }

  function changeFilter(value: FilterValueType, todolistId: string) {
    let todolist = todolists.find(tl => tl.id === todolistId);
    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists])
    }
  }

  function removeTodolist(todolistId: string) {
    let filteredTodolists = todolists.filter(tl => tl.id !== todolistId);
    setTodolists(filteredTodolists);
    delete tasksObj[todolistId];
    setTasksObj({...tasksObj});
  }

  function changeTodolistTitle(todolistId: string, newTitle: string) {
    let todolist = todolists.find(tl => tl.id === todolistId);
    if (todolist) {
      todolist.title = newTitle;
      setTodolists([...todolists]);
    }
  }

  function addTodoList(title: string) {
    let todolist: TodolistType = {
      id: v1(),
      filter: "all",
      title: title
    }
    setTodolists([todolist, ...todolists]);
    setTasksObj({
      ...tasksObj,
      [todolist.id]: []
    })
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{mr: 2}}
          >
            <Menu/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            Todolist
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{padding: '20px'}}>
          <AddItemForm addItem={addTodoList}/>
        </Grid>
        <Grid container spacing={10}>
          {
            todolists.map(tl => {
                let tasksForToDoList = tasksObj[tl.id];
                if (tl.filter === 'active') {
                  tasksForToDoList = tasksForToDoList.filter(task => task.status === TaskStatuses.New)
                }
                if (tl.filter === 'completed') {
                  tasksForToDoList = tasksForToDoList.filter(task => task.status === TaskStatuses.Completed)
                }

                return <Grid item>
                  <Paper style={{padding: '10px'}}>
                    <Todolist key={tl.id}
                              id={tl.id}
                              title={tl.title}
                              tasks={tasksForToDoList}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              changeTaskStatus={changeTaskStatus}
                              changeTaskTitle={changeTaskTitle}
                              filter={tl.filter}
                              removeTodolist={removeTodolist}
                              changeTodolistTitle={changeTodolistTitle}
                    >
                    </Todolist>
                  </Paper>
                </Grid>
              }
            )
          }
        </Grid>
      </Container>
    </div>
  )
}

export default App;

