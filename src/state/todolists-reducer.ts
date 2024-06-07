import {FilterValueType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST';
  id: string
};
export type AddTodolistActionType = {
  type: 'ADD-TODOLIST';
  title: string;
  todolistId: string
};
export type ChangeTodolistTitleActionType = {
  type: 'CHANGE-TODOLIST-TITLE';
  id: string;
  title: string
};
export type ChangeTodolistFilterActionType = {
  type: 'CHANGE-TODOLIST-FILTER';
  id: string
  filter: FilterValueType
};

type ActionsType =
  RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType;

export let todolistID01 = v1();
export let todolistID02 = v1();

const initialState: Array<TodolistType> = [
  // {id: todolistID01, title: 'What to learn', filter: 'all'},
  // {id: todolistID02, title: 'What to buy', filter: 'all'}
]

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionsType): any => {
  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      return state.filter(tl => tl.id !== action.id)
    }
    case 'ADD-TODOLIST': {
      return [{
        id: action.todolistId,
        title: action.title,
        filter: 'all'
      },
        ...state]
    }
    case 'CHANGE-TODOLIST-TITLE': {
      let todolist = state.find(tl => tl.id === action.id);
      if (todolist) {
        todolist.title = action.title;
      }
      return [...state]
    }
    case 'CHANGE-TODOLIST-FILTER': {
      let todolist = state.find(tl => tl.id === action.id);
      if (todolist) {
        todolist.filter = action.filter;
      }
      return [...state]
    }
    default:
      return state
  }
};

export const removeTodolistAC = (id: string): RemoveTodolistActionType => {
  return {type: 'REMOVE-TODOLIST', id}
};
export const addTodolistAC = (title: string): AddTodolistActionType => {
  return {type: 'ADD-TODOLIST', title, todolistId: v1()}
};
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
  return {type: 'CHANGE-TODOLIST-TITLE', id, title}
};
export const changeTodolistFilterAC = (filter: FilterValueType, id: string): ChangeTodolistFilterActionType => {
  return {type: 'CHANGE-TODOLIST-FILTER', filter, id}
};



