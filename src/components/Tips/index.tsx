import { JSX, ReactNode } from 'react';
import { TaskStateModel } from '../../models/TaskStateModel';

type TipsProps = {
  state: TaskStateModel;
  nextCycleType: keyof TaskStateModel['config'];
};

export function Tips({ state, nextCycleType }: TipsProps): JSX.Element {
  //Tips
  const tipsForWhenActiveYask: Record<keyof TaskStateModel['config'], ReactNode> = {
    workTime: <span>Foque por {state.config.workTime} minutos </span>,
    shortBreakTime: <span>Descanse por {state.config.shortBreakTime} minutos </span>,
    longBreakTime: <span>Descanso longo</span>,
  };

  const tipsForNoActiveYask: Record<keyof TaskStateModel['config'], ReactNode> = {
    workTime: <span> Proximo ciclo é de {state.config.workTime} minutos </span>,
    shortBreakTime: <span> Proximo descanso é de {state.config.shortBreakTime} minutos </span>,
    longBreakTime: <span> Próximo vai será descanso longo</span>,
  };

  return (
    <>
      {state.activeTask && tipsForWhenActiveYask[state.activeTask.type]}

      {!state.activeTask && tipsForNoActiveYask[nextCycleType]}
    </>
  );
}
