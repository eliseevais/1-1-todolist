import {
  TasksActionsType,
  tasksReducer
} from '../features/Todolists/Todolist/tasks-reducer';
import {
  TodolistActionsType,
  todolistsReducer
} from '../features/Todolists/Todolist/todolists-reducer';
import {AnyAction, applyMiddleware, combineReducers, createStore} from 'redux';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {useDispatch} from "react-redux";
import {appReducer, ErrorAndStatusActionsType} from "./app-reducer";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

// определить автоматически тип всего объекта-состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// типизация dispatch
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();

// все типы action для всего app
export type AppActionsType =
  | TodolistActionsType
  | TasksActionsType
  | ErrorAndStatusActionsType;

// типизация всех thunks
// https://redux.js.org/usage/usage-with-typescript#type-checking-redux-thunks
// https://docs.google.com/document/d/1xg6ZLT3z7qswgC5Zj03o_efe-vAc9uUSXyEKfoVCQf4/edit
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType, AppRootStateType, unknown, AppActionsType>

// @ts-ignore
window.store = store
