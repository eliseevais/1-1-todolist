import { tasksReducer } from './tasks-reducer'
import { todolistsReducer } from './todolists-reducer'
import { combineReducers, createStore } from 'redux'

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)

// @ts-ignore
window.store = store
