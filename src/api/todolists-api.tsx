import axios from "axios";


const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    'API-KEY': '7baa0947-f1d6-498f-bd5d-ed507ad6475a'
  }
})


export type TodolistType = {
  id: string
  title: string
  addedDate: string
  order: number
}

type ResponseType<D = {}> = {
  resultCode: number
  messages: Array<string>
  data: D
}

type TaskResponseType = {
  description: string
  title: string
  status: number
  priority: number
  startDate: string
  deadline: number
  id: string
  todoListId: string
  order: number
  addedDate: string
}

type TaskUpdateModelType = {
  title: string
  description: string
  status: number
  priority: number
  startDate: string
  deadline: string
}

type GetTasksResponse = {
  totalCount: number
  error: string | null
  items: Array<TaskResponseType>
}


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
    return instance.post<ResponseType<TaskResponseType>>(`todo-lists/${todolistId}/tasks`, {title: taskTitle})
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },
  updateTask(todolistId: string, taskId: string, model: TaskUpdateModelType) {
    return instance.put<TaskUpdateModelType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
  }
}