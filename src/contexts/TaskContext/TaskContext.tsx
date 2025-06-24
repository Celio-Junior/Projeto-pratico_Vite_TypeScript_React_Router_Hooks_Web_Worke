import { createContext, Dispatch } from 'react';
import { TaskStateModel } from '../../models/TaskStateModel';
import { initialTaskState } from './initialTaskContext';
import { TaskActionModel } from './taskActions';

type TaskContextProps = {
  state: TaskStateModel;
  dispatch: Dispatch<TaskActionModel>;
};

const initialContextValue: TaskContextProps = {
  state: initialTaskState,
  dispatch: () => {},
};

//valor que esta aqui, só é usado caso vc n usar o provider(ele fosse como placeholder)
export const TaskContext = createContext<TaskContextProps>(initialContextValue);
// export const TaskContext = createContext({
//   key: 'value ahhh',
// });
