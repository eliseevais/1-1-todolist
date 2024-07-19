import React, {useCallback, useEffect} from 'react';
import {useAutoAnimate} from '@formkit/auto-animate/react';
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm';
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan';
import {Button, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {Styles} from '../../../__styles';
import {Task} from './Task/Task';
import {FilterValueType, TodolistDomainType} from './todolists-reducer';
import {TaskStatuses, TaskType} from '../../../api/todolists-api';
import {useAppDispatch} from "../../../app/store";
import {fetchTasksTC, setTasksAC} from "./tasks-reducer";

type PropsType = {
  todolist: TodolistDomainType
  tasks: Array<TaskType>;
  removeTask: (taskId: string, todolistId: string) => void;
  changeFilter: (filter: FilterValueType, id: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskTitle: (taskId: string, newValue: string, todolistId: string) => void;
  changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void;
  removeTodolist: (todolistId: string) => void;
  changeTodolistTitle: (todolistId: string, newTitle: string) => void;
  children?: React.ReactNode;
  demo?: boolean
}

export const Todolist: React.FC<PropsType> = React.memo(({
                                                           children,
                                                           demo = false,
                                                           ...props
                                                         }) => {

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (demo) {
      return
    }
    dispatch(fetchTasksTC(props.todolist.id))
  }, []);

  const [listRef] = useAutoAnimate<HTMLDivElement>();
  const onAllClickHandler = useCallback(
    () => props.changeFilter('all', props.todolist.id), [props.changeFilter, props.todolist.id]);
  const onActiveClickHandler = useCallback(
    () => props.changeFilter('active', props.todolist.id), [props.changeFilter, props.todolist.id]);
  const onCompletedClickHandler = useCallback(
    () => props.changeFilter('completed', props.todolist.id), [props.changeFilter, props.todolist.id]);
  const removeTodolist = () => {
    props.removeTodolist(props.todolist.id)
  };
  const changeTodolistTitle = useCallback((newTitle: string) => {
    props.changeTodolistTitle(props.todolist.id, newTitle);
  }, [props.changeTodolistTitle, props.todolist.id]);
  const addTaskWrapper = useCallback((title: string) => {
    props.addTask(title, props.todolist.id)
  }, [props.addTask, props.todolist.id]);

  let tasksForToDoList = props.tasks;
  if (props.todolist.filter === 'active') {
    tasksForToDoList = props.tasks.filter(task => task.status === TaskStatuses.New)
  }
  if (props.todolist.filter === 'completed') {
    tasksForToDoList = props.tasks.filter(task => task.status === TaskStatuses.Completed)
  }

  return (
    <div>
      <h3>
        <EditableSpan title={props.todolist.title}
                      onChange={changeTodolistTitle}/>
        <IconButton onClick={removeTodolist}
                    disabled={props.todolist.entityStatus === 'loading'}
        >
          <Delete/>
        </IconButton>
      </h3>
      <AddItemForm addItem={addTaskWrapper}
                   disabled={props.todolist.entityStatus === 'loading'}
      />

      <div ref={listRef}>
        {tasksForToDoList.map((task: TaskType) =>
          <Task removeTask={props.removeTask}
                changeTaskTitle={props.changeTaskTitle}
                changeTaskStatus={props.changeTaskStatus}
                task={task}
                todolistId={props.todolist.id}
                key={task.id}
          />
        )}
      </div>
      <div>
        <Button variant={props.todolist.filter === 'all' ? 'outlined' : 'text'}
                onClick={onAllClickHandler}
                style={{
                  color: `${Styles.mainColor}`,
                  borderColor: `${Styles.mainColor}`
                }}
        >
          All
        </Button>
        <Button
          variant={props.todolist.filter === 'active' ? 'outlined' : 'text'}
          onClick={onActiveClickHandler}
          style={{
            color: `${Styles.secondary}`,
            borderColor: `${Styles.secondary}`
          }}
        >
          Active
        </Button>
        <Button
          variant={props.todolist.filter === 'completed' ? 'outlined' : 'text'}
          onClick={onCompletedClickHandler}
          style={{
            color: `${Styles.primary}`,
            borderColor: `${Styles.primary}`
          }}
        >
          Completed
        </Button>
      </div>
      {children}
    </div>
  )
})

