import {action} from '@storybook/addon-actions'
import {EditableSpan} from "./EditableSpan";

export default {
  title: 'EditableSpan Component',
  component: EditableSpan
}
const editableSpanChangedCallback = action('Value EditableSpan changed')

export const EditableSpanBaseExample = () => {
  return <EditableSpan
    title={'Start value'} onChange={editableSpanChangedCallback}
  />
}