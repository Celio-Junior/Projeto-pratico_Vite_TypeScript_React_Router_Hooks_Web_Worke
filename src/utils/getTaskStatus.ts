import { TaskModel } from '../models/TaskModel';

export const getTaskStatus = (task: TaskModel, activeTask: TaskModel | null) => {
  if (task.completeDate) return 'Completa';
  if (task.interruptDate) return 'Interrompida';
  if (task.id === activeTask?.id) return 'Em progresso';
  return 'Abandonada';
};
