import {
  addTaskAC,
  addTodolistAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  removeTodolistAC,
  tasksReducer
} from './tasks-reducer';
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolists-api";
import {TasksStateType} from "../app/AppWithRedux";

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
test('correct task should be deleted from correct array', () => {
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

test('correct task should be added to correct array', () => {
  const startState: any = {
    'todolistId1': todolistId1,
    'todolistId2': todolistId2
  };

  const action = addTaskAC('juice', 'todolistId2');

  const endState = tasksReducer(startState, action);

  expect(endState['todolistId1'].length).toBe(3);
  expect(endState['todolistId2'].length).toBe(4);
  expect(endState['todolistId2'][0].id).toBeDefined();
  expect(endState['todolistId2'][0].title).toBe('juice');
  expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
});

test('status of specified task should be changed', () => {
  const startState: TasksStateType = {
    'todolistId1': todolistId1,
    'todolistId2': todolistId2
  };

  const action = changeTaskStatusAC('2', TaskStatuses.New, 'todolistId2');

  const endState = tasksReducer(startState, action);

  expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New);
  expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed);
});

test('task for title should be changed and correct', () => {
  const startState: TasksStateType = {
    'todolistId1': todolistId1,
    'todolistId2': todolistId2
  };

  const action = changeTaskTitleAC('1', 'Typescript', 'todolistId1');

  const endState = tasksReducer(startState, action);

  expect(endState['todolistId1'][0].title).toBe('Typescript');

});

test('new array should be added when new todolist is added', () => {
  const startState: TasksStateType = {
    'todolistId1': todolistId1,
    'todolistId2': todolistId2
  }

  const action = addTodolistAC('new todolist')

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState);
  const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
  if (!newKey) {
    throw Error('new key should be added')
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([])
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
})