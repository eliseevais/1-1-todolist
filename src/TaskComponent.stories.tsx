import {action} from '@storybook/addon-actions'
import {TaskComponent} from "./TaskComponent";

export default {
  title: 'Task Component',
  component: TaskComponent
}
const changeTaskStatusCallback = action('Status changed inside Task')
const changeTaskTitleCallback = action('Title changed inside Task')
const changeRemoveTaskCallback = action('Remove Button clicked changed inside Task')
export const TaskComponentBaseExample = () => {
  return <>
    <TaskComponent
      task={{id: '12wsdewfijdei2343', title: 'CSS', isDone: true}}
      changeTaskStatus={changeTaskStatusCallback}
      changeTaskTitle={changeTaskTitleCallback}
      removeTask={changeRemoveTaskCallback}
      todolistId={"todolistId1"}
    />
    <TaskComponent
      task={{id: '12wsdewfijdei2344', title: 'HTML', isDone: false}}
      changeTaskStatus={changeTaskStatusCallback}
      changeTaskTitle={changeTaskTitleCallback}
      removeTask={changeRemoveTaskCallback}
      todolistId={'todolistId1'}
    />
  </>
}