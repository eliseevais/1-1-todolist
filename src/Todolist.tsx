import React, {useCallback} from 'react';
import {FilterValueType} from "./App";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Styles} from "./__styles";
import {TaskComponent} from "./TaskComponent";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
}

type PropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  removeTask: (taskId: string, todolistId: string) => void;
  changeFilter: (filter: FilterValueType, id: string) => void;
  addTask: (title: string, todolistId: string) => void;
  children?: React.ReactNode;
  changeTaskTitle: (taskId: string, newValue: string, todolistId: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
  filter: FilterValueType;
  removeTodolist: (todolistId: string) => void;
  changeTodolistTitle: (todolistId: string, newTitle: string) => void;
}

export const Todolist: React.FC<PropsType> = React.memo(({
                                                           children,
                                                           ...props
                                                         }) => {

  console.log('Todolist called');

  const [listRef] = useAutoAnimate<HTMLDivElement>();
  const onAllClickHandler = useCallback(
    () => props.changeFilter('all', props.id), [props.changeFilter, props.id]);
  const onActiveClickHandler = useCallback(
    () => props.changeFilter('active', props.id), [props.changeFilter, props.id]);
  const onCompletedClickHandler = useCallback(
    () => props.changeFilter('completed', props.id), [props.changeFilter, props.id]);
  const removeTodolist = () => {
    props.removeTodolist(props.id)
  };
  const changeTodolistTitle = useCallback((newTitle: string) => {
    props.changeTodolistTitle(props.id, newTitle);
  }, [props.changeTodolistTitle, props.id]);
  const addTaskWrapper = useCallback((title: string) => {
    props.addTask(title, props.id)
  }, [props.addTask, props.id]);

  let tasksForToDoList = props.tasks;
  if (props.filter === 'active') {
    tasksForToDoList = props.tasks.filter(task => task.isDone === false)
  }
  if (props.filter === 'completed') {
    tasksForToDoList = props.tasks.filter(task => task.isDone === true)
  }

  return (
    <div>
      <h3>
        <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
        <IconButton onClick={removeTodolist}>
          <Delete/>
        </IconButton>
      </h3>
      <AddItemForm addItem={addTaskWrapper}/>

      <div ref={listRef}>
        {tasksForToDoList.map((task: TaskType) =>
          <TaskComponent removeTask={props.removeTask}
                         changeTaskTitle={props.changeTaskTitle}
                         changeTaskStatus={props.changeTaskStatus}
                         task={task}
                         todolistId={props.id}
                         key={task.id}
          />
        )}
      </div>
      <div>
        <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                onClick={onAllClickHandler}
                style={{
                  color: `${Styles.mainColor}`,
                  borderColor: `${Styles.mainColor}`
                }}
        >
          All
        </Button>
        <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                onClick={onActiveClickHandler}
                style={{
                  color: `${Styles.secondary}`,
                  borderColor: `${Styles.secondary}`
                }}
        >
          Active
        </Button>
        <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
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

