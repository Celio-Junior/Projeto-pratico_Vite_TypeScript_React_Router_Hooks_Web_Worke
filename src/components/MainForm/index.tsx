// Componentes
import { FormEvent, useRef } from 'react';
import { PlayCircleIcon, StopCircle } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { Input } from '../Input';

//CSS
import styles from './styles.module.css';

import { TaskModel } from '../../models/TaskModel';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';
import { Tips } from '../Tips';
import { showMessage } from '../../adapters/showMessages';

/*
-> useRef =>  para criar referências mutáveis, vc pode salvar valores entre as renderizações do componente, sem causar uma nova renderização do componente
*/

export function MainForm() {
  const { state, dispatch } = useTaskContext();
  /*
  // const [taskName, setTaskName] = useState('');

  // const taskNameInput = useRef(0);
  // aqui vou tipar pois o input jsx que tem prop ref nativo(por isso que vou tipar)
  */
  const taskNameInput = useRef<HTMLInputElement>(null);

  const lastTaskName = state.tasks[state.tasks.length - 1]?.name || '';

  // Ciclos
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);
  const handleCreateNewTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    showMessage.dismiss();
    /*
    // pra mudar valor do ref usar a propriedade current
    //ele vai so mudar la tela do cliente quando algum componente da onde ele for renderizar
    // taskNameInput.current += 1;
    // console.log('valores do state %s e do ref %s ', taskName, taskNameInput.current?.value);
    */

    if (!taskNameInput.current) return;

    const taskName = taskNameInput.current.value.trim();

    if (!taskName) {
      showMessage.warn('Task Vazia');
      return;
    }

    const newTask: TaskModel = {
      id: crypto.randomUUID(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,
    };

    dispatch({ type: TaskActionTypes.START_TASK, payload: newTask });
    showMessage.sucess('task criado com sucesso');
  };

  const handleInterruptTask = () => {
    showMessage.dismiss();
    showMessage.info('task interrompida');
    dispatch({ type: TaskActionTypes.INTERRUPT_TASK });
  };

  return (
    <form onSubmit={handleCreateNewTask} className={styles['form']} action="#">
      <div className={styles['form-row']}>
        {/* quando vc coloca value no input, ta dizendo pro react controlar ele(o valor dele) agr(ver ele, observar ele) */}
        <Input
          autoComplete="off"
          type="text"
          label="task"
          id="task"
          // value={taskName}
          // onChange={(e) => setTaskName(e.target.value)}
          placeholder="digite uma task"
          ref={taskNameInput}
          disabled={!!state.activeTask}
          defaultValue={lastTaskName}
        />
      </div>
      <div className={styles['form-row']}>
        <Tips state={state} nextCycleType={nextCycleType} />
      </div>

      {state.currentCycle > 0 && (
        <div className={styles['form-row']}>
          <Cycles />
        </div>
      )}

      <div className={styles['form-row']}>
        {/* pra soluciionar um bug  vc pode usar  key, codição normal(sem usar o operador ternario)*/}
        {!state.activeTask ? (
          <DefaultButton
            aria-label="iniciar nova tarefa"
            title="iniciar nova tarefa"
            type="submit"
            icon={<PlayCircleIcon />}
            color="green"
            key="button start"
          />
        ) : (
          <DefaultButton
            aria-label="Parar tarefa atual"
            title="Parar tarefa atual"
            type="button"
            icon={<StopCircle />}
            color="red"
            onClick={handleInterruptTask}
            key="button stop"
          />
        )}
      </div>
    </form>
  );
}
