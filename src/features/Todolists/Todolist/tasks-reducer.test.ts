import {
  addTaskAC,
  updateTaskAC,
  removeTaskAC,
  setTasksAC,
  tasksReducer
} from './tasks-reducer';
import {TaskPriorities, TaskStatuses, TaskType} from "../../../api/todolists-api";
import {TasksStateType} from "../../../app/App";
import {removeTodolistAC, setTodolistsAC} from "./todolists-reducer";

let todolistId1: Array<TaskType>
let todolistId2: Array<TaskType>

beforeEach(() => {
  todolistId1 = [
    {
      todoListId: 'todolistId1',
      id: '1',
      title: 'CSS',
      description: '',
      status: TaskStatuses.New,
      priority: TaskPriorities.Low,
      order: 0,
      addedDate: '',
      deadline: '',
      startDate: ''
    },
    {
      todoListId: 'todolistId1',
      id: '2',
      title: 'JS',
      description: '',
      status: TaskStatuses.Completed,
      priority: TaskPriorities.Low,
      order: 0,
      addedDate: '',
      startDate: '',
      deadline: ''
    },
    {
      todoListId: 'todolistId1',
      id: '3',
      title: 'React',
      description: '',
      status: TaskStatuses.New,
      priority: TaskPriorities.Low,
      order: 0,
      addedDate: '',
      startDate: '',
      deadline: ''
    }
  ]
  todolistId2 = [
    {
      todoListId: 'todolistId2',
      id: '1',
      title: 'bread',
      description: '',
      status: TaskStatuses.New,
      priority: TaskPriorities.Low,
      order: 0,
      addedDate: '',
      startDate: '',
      deadline: ''
    },
    {
      todoListId: 'todolistId2',
      id: '2',
      title: 'milk',
      description: '',
      status: TaskStatuses.Completed,
      priority: TaskPriorities.Low,
      order: 0,
      addedDate: '',
      startDate: '',
      deadline: ''
    },
    {
      todoListId: 'todolistId2',
      id: '3',
      title: 'tea',
      description: '',
      status: TaskStatuses.New,
      priority: TaskPriorities.Low,
      order: 0,
      addedDate: '',
      startDate: '',
      deadline: ''
    }
  ]
})
test('correct Task should be deleted from correct array', () => {
  const startState: TasksStateType = {
    'todolistId1': todolistId1,
    'todolistId2': todolistId2
  };

  const action = removeTaskAC('2', 'todolistId2');

  const endState = tasksReducer(startState, action);

  expect(endState).toEqual({
    'todolistId1': [
      {
        todoListId: 'todolistId1',
        id: '1',
        title: 'CSS',
        description: '',
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        order: 0,
        addedDate: '',
        startDate: '',
        deadline: ''
      },
      {
        todoListId: 'todolistId1',
        id: '2',
        title: 'JS',
        description: '',
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Low,
        order: 0,
        addedDate: '',
        startDate: '',
        deadline: ''
      },
      {
        todoListId: 'todolistId1',
        id: '3',
        title: 'React',
        description: '',
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        order: 0,
        addedDate: '',
        startDate: '',
        deadline: ''
      }
    ],
    'todolistId2': [
      {
        todoListId: 'todolistId2',
        id: '1',
        title: 'bread',
        description: '',
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        order: 0,
        addedDate: '',
        startDate: '',
        deadline: ''
      },
      {
        todoListId: 'todolistId2',
        id: '3',
        title: 'tea',
        description: '',
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        order: 0,
        addedDate: '',
        startDate: '',
        deadline: ''
      }
    ]
  });
  expect(endState['todolistId1'].length).toBe(3);
  expect(endState['todolistId2'].length).toBe(2);
});

test('correct Task should be added to correct array', () => {
  const startState: any = {
    'todolistId1': todolistId1,
    'todolistId2': todolistId2
  };

  const action = addTaskAC({
    todoListId: 'todolistId2',
    title: 'juice',
    deadline: '',
    description: '',
    status: TaskStatuses.New,
    priority: TaskPriorities.Low,
    order: 0,
    id: '7',
    addedDate: '',
    startDate: ''
  });

  const endState = tasksReducer(startState, action);

  expect(endState['todolistId1'].length).toBe(3);
  expect(endState['todolistId2'].length).toBe(4);
  expect(endState['todolistId2'][0].id).toBeDefined();
  expect(endState['todolistId2'][0].title).toBe('juice');
  expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
});

test('status of specified Task should be changed', () => {
  const startState: TasksStateType = {
    'todolistId1': todolistId1,
    'todolistId2': todolistId2
  };

  const action = updateTaskAC('2', {status: TaskStatuses.New}, 'todolistId2');

  const endState = tasksReducer(startState, action);

  expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New);
  expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed);
});

test('property with todolistId should be deleted', () => {
  const startState: TasksStateType = {
    'todolistId1': todolistId1,
    'todolistId2': todolistId2
  }

  const action = removeTodolistAC('todolistId2')

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState['todolistId2']).not.toBeDefined()
});

test('empty arrays should be added when we set todolists', () => {
  const action  = setTodolistsAC([
    {id: '1', title: 'title 1', order: 0, addedDate: ''},
    {id: '2', title: 'title 2', order: 0, addedDate: ''}
  ])

  const endState = tasksReducer({}, action);
  const keys = Object.keys(endState)

  expect(keys.length).toBe(2)
  expect(endState['1']).toBeDefined()
  expect(endState['2']).toBeDefined()
});

test('tasks should be set in todolist', () => {

  const startState: TasksStateType = {
    'todolistId1': todolistId1,
    'todolistId2': todolistId2
  };

  const action = setTasksAC(startState['todolistId1'], 'todolistId1');

  const endState = tasksReducer({
    'todolistId2': [],
    'todolistId1': []
  }, action)

  expect(endState['todolistId1'].length).toBe(3)
  expect(endState['todolistId2'].length).toBe(0)
})