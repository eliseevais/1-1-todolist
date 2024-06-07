import {TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";
import {TaskType} from "../Todolist";
import {todolistID01, todolistID02} from "./todolists-reducer";

export type RemoveTaskActionType = {
  type: 'REMOVE-TASK';
  taskId: string;
  todolistId: string
};
export type AddTaskActionType = {
  type: 'ADD-TASK';
  title: string;
  todolistId: string
};
export type ChangeTaskStatusActionType = {
  type: 'CHANGE-TASK-STATUS';
  taskId: string;
  isDone: boolean;
  todolistId: string
};
export type ChangeTaskTitleActionType = {
  type: 'CHANGE-TASK-TITLE';
  taskId: string;
  newTitle: string;
  todolistId: string
};
export type AddTodolistActionType = {
  type: 'ADD-TODOLIST';
  title: string;
  todolistId: string
};
export type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST';
  id: string
};
type ActionsType =
  RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType;

const initialState: TasksStateType = {
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
}

export const tasksReducer = (state: TasksStateType = initialState,
                             action: ActionsType) => {
  switch (action.type) {
    case 'REMOVE-TASK' : {
      const stateCopy = {...state};
      const tasks = stateCopy[action.todolistId];
      const filteredTasks = tasks.filter(t => t.id !== action.taskId);
      stateCopy[action.todolistId] = filteredTasks;
      return stateCopy
    }
    case 'ADD-TASK': {
      const stateCopy = {...state};
      let newTask = {id: v1(), title: action.title, isDone: false};
      let tasks = stateCopy[action.todolistId];
      let newTasks = [newTask, ...tasks];
      stateCopy[action.todolistId] = newTasks;
      return stateCopy
    }
    case 'CHANGE-TASK-STATUS': {
      let todolistTasks = state[action.todolistId];
      let newTasksArray = todolistTasks
        .map(t => t.id === action.taskId
          ? {...t, isDone: action.isDone}
          : t);
      state[action.todolistId] = newTasksArray
      return ({...state});
    }
    case 'CHANGE-TASK-TITLE': {
      let todolistTasks = state[action.todolistId];
      let newTasksArray = todolistTasks
        .map(t => t.id === action.taskId
          ? {...t, title: action.newTitle}
          : t);
      state[action.todolistId] = newTasksArray
      return ({...state});
    }
    case 'ADD-TODOLIST': {
      const stateCopy = {...state};
      stateCopy[action.todolistId] = [];
      return stateCopy
    }
    case 'REMOVE-TODOLIST': {
      const stateCopy = {...state};
      delete stateCopy[action.id]
      return stateCopy
    }
    default:
      return state
  }
};

export const removeTaskAC = (taskId: string,
                             todolistId: string): RemoveTaskActionType => {
  return {type: 'REMOVE-TASK', taskId, todolistId}
};
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
  return {type: 'ADD-TASK', title, todolistId}
};
export const changeTaskStatusAC = (taskId: string,
                                   isDone: boolean,
                                   todolistId: string): ChangeTaskStatusActionType => {
  return {
    type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId
  }
};
export const changeTaskTitleAC = (taskId: string,
                                  newTitle: string,
                                  todolistId: string): ChangeTaskTitleActionType => {
  return {
    type: 'CHANGE-TASK-TITLE', taskId, newTitle, todolistId
  }
};
export const addTodolistAC = (title: string): AddTodolistActionType => {
  return {type: 'ADD-TODOLIST', title, todolistId: v1()}
};
export const removeTodolistAC = (id: string): RemoveTodolistActionType => {
  return {type: 'REMOVE-TODOLIST', id}
}