import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {
  AppBar,
  Button, Container, Grid,
  IconButton, Paper,
  Toolbar,
  Typography
} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
  addTodolistAC, changeTodolistFilterAC,
  changeTodolistTitleAC,
  todolistsReducer, removeTodolistAC
} from "./state/todolists-reducer";
import {
  addTaskAC,
  changeTaskStatusAC, changeTaskTitleAC,
  removeTaskAC, tasksReducer
} from "./state/tasks-reducer";

export type FilterValueType = 'all' | 'active' | 'completed';
export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValueType;
};
export type TasksStateType = {
  [key: string]: Array<TaskType>
};

function AppWithReducers() {
  let todolistID01 = v1();
  let todolistID02 = v1();

  let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
    {id: todolistID01, title: 'What to learn', filter: 'all'},
    {id: todolistID02, title: 'What to buy', filter: 'all'},
  ]);

  let [tasksObj, dispatchToTasksObjReducer] = useReducer(tasksReducer, {
    [todolistID01]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "ReactJS", isDone: false},
      {id: v1(), title: "Rest API", isDone: false},
      {id: v1(), title: "GraphQL", isDone: false},
    ],
    [todolistID02]: [
      {id: v1(), title: "Milk", isDone: false},
      {id: v1(), title: "Tea", isDone: false},
      {id: v1(), title: "Water", isDone: false},
      {id: v1(), title: "Book", isDone: false},
      {id: v1(), title: "Paper", isDone: false},
    ]
  });

  function removeTask(taskId: string, todolistId: string) {
    const action = removeTaskAC(taskId, todolistId);
    dispatchToTasksObjReducer(action)
  }

  function addTask(title: string, todolistId: string) {
    const action = addTaskAC(title, todolistId);
    dispatchToTasksObjReducer(action)
  }

  function changeTaskStatus(taskId: string, isDone: boolean, todolistId: string) {
    const action = changeTaskStatusAC(taskId, isDone, todolistId);
    dispatchToTasksObjReducer(action)
  }

  function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
    const action = changeTaskTitleAC(taskId, newTitle, todolistId);
    dispatchToTasksObjReducer(action)
  }

  function changeFilter(filter: FilterValueType, id: string) {
    const action = changeTodolistFilterAC(filter, id);
    dispatchToTodolistsReducer(action)
  }

  function removeTodolist(id: string) {
    const action = removeTodolistAC(id);
    dispatchToTasksObjReducer(action);
    dispatchToTodolistsReducer(action);
  }

  function changeTodolistTitle(id: string, title: string) {
    const action = changeTodolistTitleAC(id, title);
    dispatchToTodolistsReducer(action);
  }

  function addTodoList(title: string) {
    const action = addTodolistAC(title);
    dispatchToTasksObjReducer(action);
    dispatchToTodolistsReducer(action);
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
            todolists.map((tl: any) => {
                let tasksForToDoList = tasksObj[tl.id];
                if (tl.filter === 'active') {
                  tasksForToDoList = tasksForToDoList.filter(task => task.isDone === false)
                }
                if (tl.filter === 'completed') {
                  tasksForToDoList = tasksForToDoList.filter(task => task.isDone === true)
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

export default AppWithReducers;

