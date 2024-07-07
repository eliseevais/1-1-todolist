import {v1} from 'uuid';
import {todolistsAPI, TodolistType} from '../api/todolists-api';
import {Dispatch} from "redux";

export type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST';
  id: string
};
export type AddTodolistActionType = {
  type: 'ADD-TODOLIST';
  todolist: TodolistType
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
export type SetTodolistsActionType = {
  type: 'SET-TODOLISTS';
  todolists: Array<TodolistType>
};
export type TodolistActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | SetTodolistsActionType;

export type FilterValueType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistType & {
  filter: FilterValueType
};

export let todolistID01 = v1();
export let todolistID02 = v1();

const initialState: Array<TodolistDomainType> = [];

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState,
                                 action: TodolistActionsType): Array<TodolistDomainType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      return state.filter(tl => tl.id !== action.id)
    }
    case 'ADD-TODOLIST': {
      const newTodolist: TodolistDomainType = {...action.todolist, filter: 'all'}
      return [newTodolist, ...state]
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
    case 'SET-TODOLISTS': {
      return action.todolists.map(tl => {
        return {
          ...tl,
          filter: 'all'
        }
      })
    }
    default:
      return state
  }
};

export const removeTodolistAC = (id: string): RemoveTodolistActionType => {
  return {type: 'REMOVE-TODOLIST', id}
};
export const addTodolistAC = (todolist: TodolistType): AddTodolistActionType => {
  return {type: 'ADD-TODOLIST', todolist}
};
export const changeTodolistTitleAC = (
  id: string, title: string): ChangeTodolistTitleActionType => {
  return {type: 'CHANGE-TODOLIST-TITLE', id, title}
};
export const changeTodolistFilterAC = (
  filter: FilterValueType, id: string): ChangeTodolistFilterActionType => {
  return {type: 'CHANGE-TODOLIST-FILTER', filter, id}
};
export const setTodolistsAC = (todolists: Array<TodolistType>): SetTodolistsActionType => {
  return {type: 'SET-TODOLISTS', todolists}
};

// THUNKS
export const fetchTodolistsTC = () => {
  return (dispatch: Dispatch) => {
    todolistsAPI.getTodolists()
      .then((res) => {
        dispatch(setTodolistsAC(res.data))
      })
  }
};
export const addTodolistTC = (title: string) => {
  return (dispatch: Dispatch) => {
    todolistsAPI.createTodolist(title)
      .then((res) => {
        dispatch(addTodolistAC(res.data.data.item))
      })
  }
};
export const removeTodolistTC = (todolistId: string) => {
  return (dispatch: Dispatch) => {
    todolistsAPI.deleteTodolist(todolistId)
      .then(res => {
        dispatch(removeTodolistAC(todolistId))
      })
  }
};
export const changeTodolistTitleTC = (id: string, title: string) => {
  return (dispatch: Dispatch) => {
    todolistsAPI.updateTodolist(id, title)
      .then((res) => {
        dispatch(changeTodolistTitleAC(id, title))
      })
  }
}