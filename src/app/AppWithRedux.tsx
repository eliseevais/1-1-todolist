import React, {useCallback, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {AddItemForm} from '../features/AddItemForm';
import {AppRootStateType, useAppDispatch} from '../state/store';
import {TaskStatuses, TaskType} from '../api/todolists-api';
import './App.css';
import {Todolist} from '../todolist/Todolist';
import {Menu} from '@mui/icons-material';
import {v1} from 'uuid';
import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography
} from '@mui/material';
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  fetchTodolistsTC,
  FilterValueType,
  removeTodolistAC,
  TodolistDomainType
} from '../state/todolists-reducer';
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC
} from '../state/tasks-reducer';

export type TasksStateType = {
  [key: string]: Array<TaskType>
};

const AppWithRedux = () => {
  let todolistID01 = v1();
  let todolistID02 = v1();

  const dispatch = useAppDispatch();
  const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(
    state => state.todolists);
  const tasksObj = useSelector<AppRootStateType, TasksStateType>(
    state => state.tasks);

  useEffect(() => {
    dispatch(fetchTodolistsTC())
  }, []);

  const removeTask = useCallback((taskId: string, todolistId: string) => {
    const action = removeTaskAC(taskId, todolistId);
    dispatch(action)
  }, [dispatch])

  const addTask = useCallback((title: string, todolistId: string) => {
    const action = addTaskAC(title, todolistId);
    dispatch(action)
  }, [dispatch])

  const changeTaskStatus = useCallback(
    (taskId: string, status: TaskStatuses, todolistId: string) => {
      const action = changeTaskStatusAC(taskId, status, todolistId);
      dispatch(action)
    }, [dispatch])

  const changeTaskTitle = useCallback(
    (taskId: string, newTitle: string, todolistId: string) => {
      const action = changeTaskTitleAC(taskId, newTitle, todolistId);
      dispatch(action)
    }, [dispatch])

  const changeFilter = useCallback(
    (filter: FilterValueType, id: string) => {
      const action = changeTodolistFilterAC(filter, id);
      dispatch(action)
    }, [dispatch])

  const removeTodolist = useCallback((id: string) => {
    const action = removeTodolistAC(id);
    dispatch(action)
  }, [dispatch])

  const changeTodolistTitle = useCallback(
    (id: string, title: string) => {
      const action = changeTodolistTitleAC(id, title);
      dispatch(action);
    }, [dispatch])

  const addTodoList = useCallback((title: string) => {
    const action = addTodolistAC(title);
    dispatch(action)
  }, [dispatch])

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
                let allTodolistTasks = tasksObj[tl.id]
                let tasksForToDoList = allTodolistTasks;

                return <Grid item key={tl.id}>
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

export default AppWithRedux;

