import React from 'react'
import {Provider} from 'react-redux';
import {AppRootStateType} from "../state/store";
import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "../state/tasks-reducer";
import {todolistsReducer} from "../state/todolists-reducer";
import {v1} from "uuid";
import {TaskStatuses} from "../api/todolists-api";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer
})

const initialGlobalState = {
  todolists: [
    {id: "todolistId1", title: "What to learn", filter: "all"},
    {id: "todolistId2", title: "What to buy", filter: "all"}
  ] ,
  tasks: {
    ["todolistId1"]: [
      {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed},
      {id: v1(), title: "JS", status: TaskStatuses.New}
    ],
    ["todolistId2"]: [
      {id: v1(), title: "Milk", status: TaskStatuses.New},
      {id: v1(), title: "React Book", status: TaskStatuses.Completed}
    ]
  }
};

// @ts-ignore
export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType);
// export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);



export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>
}