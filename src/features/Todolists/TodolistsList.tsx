import {
  addTodolistTC,
  changeTodolistFilterAC, changeTodolistTitleTC,
  fetchTodolistsTC, FilterValueType, removeTodolistTC,
  TodolistDomainType
} from "./Todolist/todolists-reducer";
import React, {useCallback, useEffect} from "react";
import {AppRootStateType, useAppDispatch} from "../../app/store";
import {useSelector} from "react-redux";
import {addTaskTC, removeTaskTC, updateTaskTC} from "./Todolist/tasks-reducer";
import {TaskStatuses} from "../../api/todolists-api";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {TasksStateType} from "../../app/App";

type TodolistsPropsType = {
  todolists: Array<TodolistDomainType>
}
export const TodolistsList: React.FC<TodolistsPropsType> = (props) => {

  const dispatch = useAppDispatch();
  const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(
    state => state.todolists);
  const tasksObj = useSelector<AppRootStateType, TasksStateType>(
    state => state.tasks);

  useEffect(() => {
    dispatch(fetchTodolistsTC())
  }, []);

  const removeTask = useCallback((taskId: string, todolistId: string) => {
    dispatch(removeTaskTC(taskId, todolistId))
  }, [dispatch])

  const addTask = useCallback((title: string, todolistId: string) => {
    dispatch(addTaskTC(title, todolistId))
  }, [dispatch])

  const changeTaskStatus = useCallback(
    (taskId: string, status: TaskStatuses, todolistId: string) => {
      dispatch(updateTaskTC(taskId, {status}, todolistId))
    }, [dispatch])

  const changeTaskTitle = useCallback(
    (taskId: string, newTitle: string, todolistId: string) => {
      dispatch(updateTaskTC(taskId, {title: newTitle}, todolistId))
    }, [dispatch])

  const changeFilter = useCallback(
    (filter: FilterValueType, id: string) => {
      const action = changeTodolistFilterAC(filter, id);
      dispatch(action)
    }, [dispatch])

  const removeTodolist = useCallback((id: string) => {
    dispatch(removeTodolistTC(id))
  }, [dispatch])

  const changeTodolistTitle = useCallback(
    (id: string, title: string) => {
      dispatch(changeTodolistTitleTC(id, title))
    }, [dispatch])

  const addTodoList = useCallback((title: string) => {
    dispatch(addTodolistTC(title))
  }, [dispatch])

  return (
    <>
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
    </>
  )
}