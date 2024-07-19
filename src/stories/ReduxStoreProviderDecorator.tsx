import React from 'react'
import {Provider} from 'react-redux';
import {AppRootStateType} from "../app/store";
import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "../features/Todolists/Todolist/tasks-reducer";
import {
  todolistsReducer
} from "../features/Todolists/Todolist/todolists-reducer";
import {v1} from "uuid";
import {TaskStatuses} from "../api/todolists-api";
import {appReducer} from "../app/app-reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer
})

const initialGlobalState: AppRootStateType = {
  todolists: [
    {
      id: "todolistId1",
      title: "What to learn",
      filter: "all",
      addedDate: '',
      order: 0,
      entityStatus: 'loading'
    },
    {
      id: "todolistId2",
      title: "What to buy",
      filter: "all",
      addedDate: '',
      order: 0,
      entityStatus: 'idle'
    }
  ],
  tasks: {
    ["todolistId1"]: [
      {
        id: v1(),
        title: "HTML&CSS",
        status: TaskStatuses.Completed,
        order: 0,
        addedDate: '',
        priority: 0,
        todoListId: 'todolistId1',
        deadline: '',
        startDate: '',
        description: ''
      },
      {
        id: v1(), title: "JS", status: TaskStatuses.New, order: 0,
        addedDate: '',
        priority: 0,
        todoListId: 'todolistId1',
        deadline: '',
        startDate: '',
        description: ''
      }
    ],
    ["todolistId2"]: [
      {
        id: v1(), title: "Milk", status: TaskStatuses.New, order: 0,
        addedDate: '',
        priority: 0,
        todoListId: 'todolistId2',
        deadline: '',
        startDate: '',
        description: ''
      },
      {
        id: v1(), title: "React Book", status: TaskStatuses.Completed, order: 0,
        addedDate: '',
        priority: 0,
        todoListId: 'todolistId2',
        deadline: '',
        startDate: '',
        description: ''
      }
    ]
  },
  app: {
    status: "idle",
    error: null
  }
};

// @ts-ignore
export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType, applyMiddleware(thunk));
// export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>
}