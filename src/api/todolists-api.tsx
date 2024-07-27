import axios from "axios";

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    'API-KEY': '7baa0947-f1d6-498f-bd5d-ed507ad6475a'
  }
});

// API
export const todolistsAPI = {
  getTodolists() {
    return instance.get<Array<TodolistType>>('todo-lists')
  },
  createTodolist(title: string) {
    return instance.post<ResponseType<{
      item: TodolistType
    }>>('todo-lists', {title: title})
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
  },
  updateTodolist(todolistId: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${todolistId}`,
      {title: title})
  },
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
  },
  createTask(todolistId: string, taskTitle: string) {
    return instance.post<ResponseType<{
      item: TaskType
    }>>(`todo-lists/${todolistId}/tasks`, {title: taskTitle})
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },
  updateTask(todolistId: string, taskId: string, model: TaskUpdateModelType) {
    return instance.put<ResponseType<TaskUpdateModelType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
  }
};

export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<ResponseType<{ userId?: number }>>('auth/login', data)
  },
  me() {
    return instance.get<ResponseType<{
      id: string,
      email: string,
      login: boolean
    }>>(`/auth/me`)
  },
  logout() {
    return instance.delete<ResponseType<{ userId?: number }>>(`/auth/login`)
  }
}


// TYPES
export enum TaskStatuses {
  New = 0,
  InProgress,
  Completed,
  Draft
}

export enum TaskPriorities {
  Low,
  Middle,
  High,
  Urgently,
  Later
}

export type TodolistType = {
  id: string
  title: string
  addedDate: string
  order: number
};
export type TaskType = {
  description: string
  title: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
};
export type TaskUpdateModelType = {
  title: string
  description: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
};
export type ResponseType<D = {}> = {
  resultCode: number
  messages: Array<string>
  data: D
};
type GetTasksResponse = {
  totalCount: number
  error: string | null
  items: Array<TaskType>
};
export type LoginParamsType = {
  email: string
  password: string
  rememberMe: boolean
  captcha?: boolean
}

