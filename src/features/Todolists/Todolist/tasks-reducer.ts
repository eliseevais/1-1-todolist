import {
  AddTodolistActionType,
  RemoveTodolistActionType,
  SetTodolistsActionType
} from "./todolists-reducer";
import {
  TaskPriorities,
  TaskStatuses,
  TaskType,
  TaskUpdateModelType,
  todolistsAPI
} from "../../../api/todolists-api";
import {TasksStateType} from "../../../app/App";
import {AppActionsType, AppRootStateType, AppThunk} from "../../../app/store";
import {
  setAppErrorAC,
  SetAppErrorActionType,
  setAppStatusAC
} from "../../../app/app-reducer";
import {Dispatch} from "redux";
import {
  handleServerAppError,
  handleServerNetworkError
} from "../../../utils/error-utils";

const initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState,
                             action: TasksActionsType) => {
  switch (action.type) {
    case 'REMOVE-TASK' :
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
      }
    case 'ADD-TASK':
      return {
        ...state,
        [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
      }
    case 'UPDATE-TASK':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId
          ? {...t, ...action.model} : t)
      }
    case 'ADD-TODOLIST':
      return {
        ...state,
        [action.todolist.id]: []
      }
    case 'REMOVE-TODOLIST':
      const stateCopy = {...state};
      delete stateCopy[action.id];
      return stateCopy
    case 'SET-TODOLISTS': {
      const stateCopy = {...state};
      action.todolists.forEach(tl => {
        stateCopy[tl.id] = []
      });
      return stateCopy
    }
    case 'SET-TASKS':
      return {
        ...state,
        [action.todolistId]: action.tasks
      }
    default:
      return state
  }
};

// ACTIONS
export const removeTaskAC = (taskId: string, todolistId: string) => {
  return {type: 'REMOVE-TASK', taskId, todolistId} as const
};
export const addTaskAC = (task: TaskType) => {
  return {type: 'ADD-TASK', task} as const
};
export const updateTaskAC = (taskId: string, model: TaskUpdateDomainModelType,
                             todolistId: string) => {
  return {type: 'UPDATE-TASK', taskId, model, todolistId} as const
};
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => {
  return {type: 'SET-TASKS', tasks, todolistId} as const
};

// THUNKS
export const fetchTasksTC = (todolistId: string): AppThunk => (dispatch) => {
  dispatch(setAppStatusAC('loading'));
  todolistsAPI.getTasks(todolistId)
    .then((res) => {
      const tasks = res.data.items;
      dispatch(setTasksAC(tasks, todolistId));
      dispatch(setAppStatusAC('succeeded'))
    })
};
export const removeTaskTC = (taskId: string, todolistId: string): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatusAC('loading'));
    todolistsAPI.deleteTask(todolistId, taskId)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(removeTaskAC(taskId, todolistId));
          dispatch(setAppStatusAC('succeeded'))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch)
      })
  };
export const addTaskTC = (title: string, todolistId: string): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatusAC('loading'));
    todolistsAPI.createTask(todolistId, title)
      .then(res => {
        if (res.data.resultCode === 0) {
          dispatch(addTaskAC(res.data.data.item));
          dispatch(setAppStatusAC('succeeded'))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch)
      })
  };

export const updateTaskTC = (taskId: string, domainModel: TaskUpdateDomainModelType, todolistId: string): (dispatch: Dispatch<TasksActionsType | AppActionsType>, getState: () => AppRootStateType) => any => {
  return (dispatch: Dispatch<TasksActionsType | AppActionsType>, getState: () => AppRootStateType) => {

    const state = getState();
    const task = state.tasks[todolistId].find(t => t.id === taskId);

    if (!task) {
      console.warn('Task is not found');
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

    dispatch(setAppStatusAC('loading'));

    todolistsAPI.updateTask(todolistId, taskId, apiModel)
      .then(res => {
        console.log('res.data', res.data)
        if (res.data.resultCode === 0) {
          dispatch(updateTaskAC(taskId, domainModel, todolistId));
          dispatch(setAppStatusAC('succeeded'))
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch)
      })
  }
}

// TYPES
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
export type AddTaskActionType = ReturnType<typeof addTaskAC>;
export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>;
export type SetTasksActionType = ReturnType<typeof setTasksAC>;

export type TasksActionsType =
  RemoveTaskActionType
  | AddTaskActionType
  | UpdateTaskActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolistsActionType
  | SetTasksActionType;

export type TaskUpdateDomainModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
};

export type ThunkDispatch =
  TasksActionsType
  | AppActionsType
  | SetAppErrorActionType;
