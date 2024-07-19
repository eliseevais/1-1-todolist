import {todolistsAPI, TodolistType} from '../../../api/todolists-api';
import {AppThunk} from "../../../app/store";
import {RequestStatusType, setAppStatusAC} from "../../../app/app-reducer";

const initialState: Array<TodolistDomainType> = [];

export const todolistsReducer = (
  state: Array<TodolistDomainType> = initialState,
  action: TodolistActionsType): Array<TodolistDomainType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter(tl => tl.id !== action.id)
    case 'ADD-TODOLIST':
      return [{
        ...action.todolist,
        filter: 'all',
        entityStatus: 'idle'
      }, ...state]
    case 'CHANGE-TODOLIST-TITLE':
      return state.map(tl => tl.id === action.id
        ? {...tl, title: action.title} : tl)
    case 'CHANGE-TODOLIST-FILTER':
      return state.map(tl => tl.id === action.id
        ? {...tl, filter: action.filter} : tl)
    case "CHANGE-TODOLIST-ENTITY-STATUS":
      return state.map(tl => tl.id === action.id
        ? {...tl, entityStatus: action.entityStatus} : tl)
    case 'SET-TODOLISTS':
      return action.todolists.map(tl => {
        return {...tl, filter: 'all', entityStatus: 'idle'}
      })
    default:
      return state
  }
};

// ACTIONS
export const removeTodolistAC = (id: string) => {
  return {type: 'REMOVE-TODOLIST', id} as const
};
export const addTodolistAC = (todolist: TodolistType) => {
  return {type: 'ADD-TODOLIST', todolist} as const
};
export const changeTodolistTitleAC = (
  id: string, title: string) => {
  return {type: 'CHANGE-TODOLIST-TITLE', id, title} as const
};
export const changeTodolistFilterAC = (
  id: string, filter: FilterValueType) => {
  return {type: 'CHANGE-TODOLIST-FILTER', filter, id} as const
};
export const changeTodolistEntityStatusAC = (
  id: string, entityStatus: RequestStatusType) => {
  return {type: 'CHANGE-TODOLIST-ENTITY-STATUS', entityStatus, id} as const
};
export const setTodolistsAC = (todolists: Array<TodolistType>) => {
  return {type: 'SET-TODOLISTS', todolists} as const
};

// THUNKS
export const _fetchTodolistsTC = (): AppThunk => (dispatch) => {
  dispatch(setAppStatusAC('loading'));
  todolistsAPI.getTodolists()
    .then((res) => {
      dispatch(setTodolistsAC(res.data));
      dispatch(setAppStatusAC('succeeded'))
    })
};
export const fetchTodolistsTC = (): AppThunk => async dispatch => {
  dispatch(setAppStatusAC('loading'))
  try {
    const res = await todolistsAPI.getTodolists();
    dispatch(setTodolistsAC(res.data));
    dispatch(setAppStatusAC('succeeded'))
  } catch (e) {
    console.warn(e);
    dispatch(setAppStatusAC('failed'))
  }
};
export const addTodolistTC = (title: string): AppThunk => (dispatch) => {
  dispatch(setAppStatusAC('loading'));
  todolistsAPI.createTodolist(title)
    .then((res) => {
      dispatch(addTodolistAC(res.data.data.item));
      dispatch(setAppStatusAC('succeeded'))
    })
};
export const removeTodolistTC = (todolistId: string): AppThunk => (dispatch) => {
  dispatch(setAppStatusAC('loading'));
  dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'));
  todolistsAPI.deleteTodolist(todolistId)
    .then(res => {
      dispatch(removeTodolistAC(todolistId));
      dispatch(setAppStatusAC('succeeded'))
    })
};
export const changeTodolistTitleTC = (id: string, title: string): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatusAC('loading'));
    dispatch(changeTodolistEntityStatusAC(id, 'loading'));
    todolistsAPI.updateTodolist(id, title)
      .then((res) => {
        dispatch(changeTodolistTitleAC(id, title));
        dispatch(setAppStatusAC('succeeded'));
        dispatch(changeTodolistEntityStatusAC(id, 'succeeded'))
      })
  };

// TYPES
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type ChangeTodolistTitleActionType = ReturnType<
  typeof changeTodolistTitleAC>;
export type ChangeTodolistFilterActionType = ReturnType<
  typeof changeTodolistFilterAC>;
export type changeTodolistEntityStatusActionType = ReturnType<
  typeof changeTodolistEntityStatusAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;

export type TodolistActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | changeTodolistEntityStatusActionType
  | SetTodolistsActionType;

export type FilterValueType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistType & {
  filter: FilterValueType
  entityStatus: RequestStatusType
};