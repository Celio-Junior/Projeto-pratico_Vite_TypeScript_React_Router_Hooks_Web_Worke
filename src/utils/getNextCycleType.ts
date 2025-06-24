import { TaskStateModel } from '../models/TaskStateModel';

type GetNextCycleTypeInterface = (currentCycle: number) => keyof TaskStateModel['config'];

export const getNextCycleType: GetNextCycleTypeInterface = (currentCycle) => {
  if (currentCycle % 8 === 0) return 'longBreakTime';
  return currentCycle % 2 === 0 ? 'shortBreakTime' : 'workTime';
};
