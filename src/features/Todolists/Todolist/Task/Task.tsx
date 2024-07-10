import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {Styles} from "../../../../__styles";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskStatuses, TaskType} from "../../../../api/todolists-api";

type TaskComponentPropsType = {
  removeTask: (taskId: string, todolistId: string) => void;
  changeTaskTitle: (taskId: string, newValue: string, todolistId: string) => void;
  changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void;
  task: TaskType;
  todolistId: string
}
export const Task = React.memo((props: TaskComponentPropsType) => {
  const onRemoveTaskHandler = () => props.removeTask(props.task.id, props.todolistId);

  const onChangeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
    let newIsDoneValue = event.currentTarget.checked;
    props.changeTaskStatus(
      props.task.id, newIsDoneValue
        ? TaskStatuses.Completed
        : TaskStatuses.New,
      props.todolistId);
    // props.changeTaskStatus(props.Task.id, event.currentTarget.checked, props.todolistId);
  };

  const onChangeTitleHandler = useCallback((newValue: string) => {
    props.changeTaskTitle(props.task.id, newValue, props.todolistId);
  }, [props.changeTaskTitle, props.task.id, props.todolistId]);

  return (
    <div key={props.task.id}
         className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
      <Checkbox checked={props.task.status === TaskStatuses.Completed}
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