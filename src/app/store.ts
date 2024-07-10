import {tasksReducer} from '../features/Todolists/Todolist/tasks-reducer';
import {todolistsReducer} from '../features/Todolists/Todolist/todolists-reducer';
import {AnyAction, applyMiddleware, combineReducers, createStore} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {useDispatch} from "react-redux";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

// определить автоматически тип всего объекта-состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// типизация dispatch
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();


// @ts-ignore
window.store = store
