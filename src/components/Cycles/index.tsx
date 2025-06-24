import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { TaskStateModel } from '../../models/TaskStateModel';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import styles from './styles.module.css';

export function Cycles() {
  const { state } = useTaskContext();

  const cycleStep = Array.from({ length: state.currentCycle });

  const cycleDescription: Record<keyof TaskStateModel['config'], string> = {
    workTime: 'Foco',
    shortBreakTime: 'descanso curto',
    longBreakTime: 'descanso longo',
  };

  return (
    <div className={styles['cycles']}>
      <span>Ciclos:</span>
      <div className={styles['cycle-dots']}>
        {cycleStep.map((_, index) => {
          const nextCycle = getNextCycle(index);
          const nextCycleType = getNextCycleType(nextCycle);

          // esse key => é mais pra ser um identificador pro react poder renderizar e fazer a checagem
          // to usando o indice, MAS não é boa prática de programação viu
          return (
            <span
              key={nextCycle}
              aria-label={`indicador de ciclo que está em ${cycleDescription[nextCycleType]}`}
              title={`O ciclo está em ${cycleDescription[nextCycleType]}`}
              className={`${styles['cycle-dot']} ${styles[nextCycleType]}`}
            ></span>
          );
        })}
      </div>
    </div>
  );
}
