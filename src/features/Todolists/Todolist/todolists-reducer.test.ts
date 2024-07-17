import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  FilterValueType,
  removeTodolistAC, setTodolistsAC,
  TodolistDomainType,
  todolistsReducer
} from "./todolists-reducer";
import {v1} from "uuid";

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistDomainType>

beforeEach(() => {
  todolistId1 = v1();
  todolistId2 = v1();
  startState = [
    {id: todolistId1,
      title: 'What to learn',
      filter: 'all',
      order: 0, addedDate: '',
      entityStatus: 'idle'
    },
    {id: todolistId2,
      title: 'What to buy',
      filter: 'all',
      order: 0,
      addedDate: '',
      entityStatus: 'idle'
    }
  ];
})

test('correct todolist should be removed', () => {
  const endState = todolistsReducer(startState, removeTodolistAC(todolistId1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2)
});

test('correct todolist should be added', () => {
  let newTodolist = {
    id: 'test_id',
    title: 'New Todolist',
    addedDate: '',
    order: 0
  }

  const endState = todolistsReducer(startState, addTodolistAC(newTodolist));

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(newTodolist.title);
});

test('correct todolist should change its name', () => {
  let newTodolistTitle = 'New Todolist';

  const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, newTodolistTitle));

  expect(endState[0].title).toBe('What to learn');
  expect(endState[1].title).toBe(newTodolistTitle)
});

test('correct filter of todolist should be changed', () => {
  let newFilter: FilterValueType = 'completed';

  const endState = todolistsReducer(startState, changeTodolistFilterAC(newFilter, todolistId2,));

  expect(endState[0].filter).toBe('all');
  expect(endState[1].filter).toBe(newFilter)
});

test('todolists should be set to the state', () => {

  const action = setTodolistsAC(startState);

  const endState = todolistsReducer([], action);

  expect(endState.length).toBe(2)
});

