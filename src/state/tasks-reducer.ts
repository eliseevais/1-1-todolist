import {v1} from "uuid";
import {
  AddTodolistActionType,
  setTodolistsAC,
  SetTodolistsActionType,
  todolistID01,
  todolistID02
} from "./todolists-reducer";
import {
  TaskPriorities,
  TaskStatuses,
  TaskType, TaskUpdateModelType,
  todolistsAPI, TodolistType
} from "../api/todolists-api";
import {TasksStateType} from "../app/AppWithRedux";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type RemoveTaskActionType = {
  type: 'REMOVE-TASK';
  taskId: string;
  todolistId: string
};
export type AddTaskActionType = {
  type: 'ADD-TASK';
  task: TaskType
};
export type UpdateTaskActionType = {
  type: 'UPDATE-TASK';
  taskId: string;
  model: TaskUpdateDomainModelType;
  todolistId: string
};
export type ChangeTaskTitleActionType = {
  type: 'CHANGE-TASK-TITLE';
  taskId: string;
  newTitle: string;
  todolistId: string
};
// export type AddTodolistActionType = {
//   type: 'ADD-TODOLIST';
//   title: string;
//   todolistId: string
// };
// export type AddTodolistActionType = {
//   type: 'ADD-TODOLIST';
//   todolist: TodolistType
// };
export type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST';
  id: string
};
export type SetTasksActionType = {
  type: 'SET-TASKS';
  tasks: Array<TaskType>;
  todolistId: string
}
export type TasksActionsType =
  RemoveTaskActionType
  | AddTaskActionType
  | UpdateTaskActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolistsActionType
  | SetTasksActionType;

const initialState: TasksStateType = {
  [todolistID01]: [
    {
      id: v1(),
      title: "HTML&CSS",
      status: TaskStatuses.Completed,
      todoListId: todolistID01,
      order: 0,
      startDate: '',
      deadline: '',
      priority: TaskPriorities.Low,
      addedDate: '',
      description: ''
    },
    {
      id: v1(),
      title: "JS",
      status: TaskStatuses.Completed,
      todoListId: todolistID01,
      order: 0,
      startDate: '',
      deadline: '',
      priority: TaskPriorities.Low,
      addedDate: '',
      description: ''
    },
    {
      id: v1(),
      title: "ReactJS",
      status: TaskStatuses.New,
      todoListId: todolistID01,
      order: 0,
      startDate: '',
      deadline: '',
      priority: TaskPriorities.Low,
      addedDate: '',
      description: ''
    },
    {
      id: v1(),
      title: "Rest API",
      status: TaskStatuses.New,
      todoListId: todolistID01,
      order: 0,
      startDate: '',
      deadline: '',
      priority: TaskPriorities.Low,
      addedDate: '',
      description: ''
    },
    {
      id: v1(),
      title: "GraphQL",
      status: TaskStatuses.New,
      todoListId: todolistID01,
      order: 0,
      startDate: '',
      deadline: '',
      priority: TaskPriorities.Low,
      addedDate: '',
      description: ''
    },
  ],
  [todolistID02]: [
    {
      id: v1(),
      title: "Milk",
      status: TaskStatuses.New,
      todoListId: todolistID02,
      order: 0,
      startDate: '',
      deadline: '',
      priority: TaskPriorities.Low,
      addedDate: '',
      description: ''
    },
    {
      id: v1(),
      title: "Tea",
      status: TaskStatuses.New,
      todoListId: todolistID02,
      order: 0,
      startDate: '',
      deadline: '',
      priority: TaskPriorities.Low,
      addedDate: '',
      description: ''
    },
    {
      id: v1(),
      title: "Water",
      status: TaskStatuses.New,
      todoListId: todolistID02,
      order: 0,
      startDate: '',
      deadline: '',
      priority: TaskPriorities.Low,
      addedDate: '',
      description: ''
    },
    {
      id: v1(),
      title: "Book",
      status: TaskStatuses.New,
      todoListId: todolistID02,
      order: 0,
      startDate: '',
      deadline: '',
      priority: TaskPriorities.Low,
      addedDate: '',
      description: ''
    },
    {
      id: v1(),
      title: "Paper",
      status: TaskStatuses.New,
      todoListId: todolistID02,
      order: 0,
      startDate: '',
      deadline: '',
      priority: TaskPriorities.Low,
      addedDate: '',
      description: ''
    },
  ]
}

export const tasksReducer = (state: TasksStateType = initialState,
                             action: TasksActionsType) => {
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
      let newTask = action.task
      let tasks = stateCopy[newTask.todoListId];
      let newTasks = [newTask, ...tasks];
      stateCopy[newTask.todoListId] = newTasks;
      return stateCopy
    }
    case 'UPDATE-TASK': {
      let todolistTasks = state[action.todolistId];
      let newTasksArray = todolistTasks
        .map(t => t.id === action.taskId
          ? {...t, ...action.model}
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
      stateCopy[action.todolist.id] = [];
      return stateCopy
    }
    case 'REMOVE-TODOLIST': {
      const stateCopy = {...state};
      delete stateCopy[action.id]
      return stateCopy
    }
    case 'SET-TODOLISTS': {
      const stateCopy = {...state};
      action.todolists.forEach(tl => {
        stateCopy[tl.id] = []
      });
      return stateCopy
    }
    case 'SET-TASKS': {
      const stateCopy = {...state};
      stateCopy[action.todolistId] = action.tasks;
      return stateCopy
    }
    default:
      return state
  }
};

// ACTIONS
export const removeTaskAC = (taskId: string,
                             todolistId: string): RemoveTaskActionType => {
  return {type: 'REMOVE-TASK', taskId, todolistId}
};
export const addTaskAC = (task: TaskType): AddTaskActionType => {
  return {type: 'ADD-TASK', task}
};
export const updateTaskAC = (taskId: string,
                             model: TaskUpdateDomainModelType,
                             todolistId: string): UpdateTaskActionType => {
  return {
    type: 'UPDATE-TASK', taskId, model, todolistId
  }
};
export const changeTaskTitleAC = (taskId: string,
                                  newTitle: string,
                                  todolistId: string): ChangeTaskTitleActionType => {
  return {
    type: 'CHANGE-TASK-TITLE', taskId, newTitle, todolistId
  }
};
// export const addTodolistAC = (title: string): AddTodolistActionType => {
//   return {type: 'ADD-TODOLIST', title, todolistId: v1()}
// };
export const removeTodolistAC = (id: string): RemoveTodolistActionType => {
  return {type: 'REMOVE-TODOLIST', id}
};
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
  return {type: 'SET-TASKS', tasks, todolistId}
};

// THUNKS
export const fetchTasksTC = (todolistId: string) => {
  return (dispatch: Dispatch) => {
    todolistsAPI.getTasks(todolistId)
      .then((res) => {
        const tasks = res.data.items;
        dispatch(setTasksAC(tasks, todolistId))
      })
  }
};
export const removeTaskTC = (taskId: string, todolistId: string) => {
  return (dispatch: Dispatch) => {
    todolistsAPI.deleteTask(todolistId, taskId)
      .then((res) => {
        dispatch(removeTaskAC(taskId, todolistId))
      })
  }
};
export const addTaskTC = (title: string, todolistId: string) => {
  return (dispatch: Dispatch) => {
    todolistsAPI.createTask(todolistId, title)
      .then(res => {
        dispatch(addTaskAC(res.data.data.item))
      })
  }
};

export type TaskUpdateDomainModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
};
export const updateTaskTC = (taskId: string, domainModel: TaskUpdateDomainModelType, todolistId: string) => {
  return (dispatch: Dispatch, getState: () => AppRootStateType) => {

    const state = getState();
    const task = state.tasks[todolistId].find(t => t.id === taskId);
    if (!task) {
      console.warn('task is not found');
      return
    }

    const apiModel: TaskUpdateModelType = {
      status: task.status,
      startDate: task.startDate,
      priority: task.priority,
      description: task.description,
      deadline: task.deadline,
      title: task.title,
      ...domainModel
    }

    todolistsAPI.updateTask(todolistId, taskId, apiModel)
      .then((res) => {
        dispatch(updateTaskAC(taskId, domainModel, todolistId))
      })
  }
};