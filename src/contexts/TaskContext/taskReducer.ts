import { TaskStateModel } from '../../models/TaskStateModel';
import { formatSecondsToMinutes } from '../../utils/formatSecondsToMinutes';
import { getNextCycle } from '../../utils/getNextCycle';
import { initialTaskState } from './initialTaskContext';
import { TaskActionModel, TaskActionTypes } from './taskActions';

export function taskReducer(state: TaskStateModel, action: TaskActionModel): TaskStateModel {
  switch (action.type) {
    case TaskActionTypes.START_TASK: {
      const nextCycle = getNextCycle(state.currentCycle);
      // const nextCycleType = getNextCycleType(nextCycle);

      const secondsRemaining = action.payload.duration * 60;

      return {
        ...state,
        activeTask: action.payload,
        currentCycle: nextCycle,
        secondsRemaining,
        formattedSecondRemaining: formatSecondsToMinutes(secondsRemaining),
        tasks: [...state.tasks, action.payload],
      };
    }

    case TaskActionTypes.INTERRUPT_TASK: {
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondRemaining: '00:00',
        tasks: state.tasks.map((task) => {
          if (state.activeTask !== null && task.id === state.activeTask.id)
            return { ...task, interruptDate: Date.now() };
          return task;
        }),
      };
    }

    case TaskActionTypes.RESET_STATE: {
      return { ...initialTaskState };
    }

    case TaskActionTypes.COUNT_DOWN: {
      return {
        ...state,
        secondsRemaining: action.payload.secondsRemaining,
        formattedSecondRemaining: formatSecondsToMinutes(action.payload.secondsRemaining),
      };
    }
    case TaskActionTypes.COMPLETE_STATE: {
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondRemaining: '00:00',
        tasks: state.tasks.map((task) => {
          if (state.activeTask !== null && task.id === state.activeTask.id)
            return { ...task, completeDate: Date.now() };
          return task;
        }),
      };
    }

    case TaskActionTypes.CHANGE_SETTINGS: {
      return { ...state, config: { ...action.payload } };
    }
  }
}
