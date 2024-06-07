import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {Styles} from "./__styles";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./Todolist";

type TaskComponentPropsType = {
  removeTask: (taskId: string, todolistId: string) => void;
  changeTaskTitle: (taskId: string, newValue: string, todolistId: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
  task: TaskType;
  todolistId: string
}
export const TaskComponent = React.memo((props: TaskComponentPropsType) => {
  const onRemoveTaskHandler = () => props.removeTask(props.task.id, props.todolistId);
  const onChangeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
    props.changeTaskStatus(props.task.id, event.currentTarget.checked, props.todolistId);
  };
  const onChangeTitleHandler = useCallback((newValue: string) => {
    props.changeTaskTitle(props.task.id, newValue, props.todolistId);
  }, [props.changeTaskTitle, props.task.id, props.todolistId]);

  return (
    <div key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
      <Checkbox checked={props.task.isDone}
                onChange={onChangeStatusHandler}
                style={{color: `${Styles.mainColor}`}}
      />
      <EditableSpan title={props.task.title}
                    onChange={onChangeTitleHandler}
      />
      <IconButton onClick={onRemoveTaskHandler}>
        <Delete/>
      </IconButton>
    </div>
  )
})