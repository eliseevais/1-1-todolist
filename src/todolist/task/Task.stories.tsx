import {action} from '@storybook/addon-actions'
import {Task} from "./Task";
import {TaskPriorities, TaskStatuses} from "../../api/todolists-api";

export default {
  title: 'Task Component',
  component: Task
}
const changeTaskStatusCallback = action('Status changed inside Task')
const changeTaskTitleCallback = action('Title changed inside Task')
const changeRemoveTaskCallback = action('Remove Button clicked changed inside Task')
export const TaskComponentBaseExample = () => {
  return <>
    <Task
      task={{
        id: '12wsdewfijdei2343',
        title: 'CSS',
        status: TaskStatuses.Completed,
        startDate: '',
        todoListId: 'todolistId1',
        priority: TaskPriorities.Low,
        order: 0,
        addedDate: '',
        description: '',
        deadline: ''
      }}
      changeTaskStatus={changeTaskStatusCallback}
      changeTaskTitle={changeTaskTitleCallback}
      removeTask={changeRemoveTaskCallback}
      todolistId={"todolistId1"}
    />
    <Task
      task={{
        id: '12wsdewfijdei2344',
        title: 'HTML',
        status: TaskStatuses.New,
        startDate: '',
        todoListId: 'todolistId1',
        priority: TaskPriorities.Low,
        order: 0,
        addedDate: '',
        description: '',
        deadline: ''
      }}
      changeTaskStatus={changeTaskStatusCallback}
      changeTaskTitle={changeTaskTitleCallback}
      removeTask={changeRemoveTaskCallback}
      todolistId={'todolistId1'}
    />
  </>
}