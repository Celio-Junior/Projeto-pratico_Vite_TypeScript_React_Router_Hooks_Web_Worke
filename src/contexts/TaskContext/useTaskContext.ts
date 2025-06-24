import { useContext } from 'react';
import { TaskContext } from './TaskContext';

export const useTaskContext = () => {
  return useContext(TaskContext);
};
