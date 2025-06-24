import { TaskModel } from '../models/TaskModel';

export const getTaskType = (type: TaskModel['type']) => {
  const types: Record<TaskModel['type'], string> = {
    workTime: 'Em Foco',
    shortBreakTime: 'descanso curto',
    longBreakTime: 'Descanso longo',
  };
  return types[type];
};
