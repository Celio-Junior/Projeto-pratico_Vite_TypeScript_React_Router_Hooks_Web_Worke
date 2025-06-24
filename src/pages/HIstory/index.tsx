import { JSX, useEffect, useState } from 'react';
import { MainTemplate } from '../../templates/MainTemplate';
import { DefaultButton } from '../../components/DefaultButton';
import { TrashIcon } from 'lucide-react';

import styles from './styles.module.css';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { formatDate } from '../../utils/formateDate';
import { getTaskStatus } from '../../utils/getTaskStatus';
import { getTaskType } from '../../utils/getTaskType';
import { SortTaskConfig, sortTasks } from '../../utils/sortTasks';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';
import { showMessage } from '../../adapters/showMessages';

// export default function Home({ state }: HomeProps): JSX.Element {
export default function History(): JSX.Element {
  const { state, dispatch } = useTaskContext();
  const [confirmClearhistory, setConfirmClearhistory] = useState<boolean>(false);
  const hasTasks = state.tasks.length > 0;

  const [sortedTasks, setSortedTasks] = useState<SortTaskConfig>(() => {
    return {
      tasks: sortTasks({ tasks: state.tasks }),
      field: 'startDate',
      direction: 'desc',
    };
  });

  function handleSortTasks({ field }: Pick<SortTaskConfig, 'field'>) {
    const newDirection: typeof sortedTasks.direction =
      sortedTasks.direction === 'desc' ? 'asc' : 'desc';
    console.log(newDirection);
    setSortedTasks({
      tasks: sortTasks({ tasks: sortedTasks.tasks, direction: newDirection, field }),
      direction: newDirection,
      field,
    });
  }

  function handleResetHistory() {
    showMessage.dismiss();
    showMessage.confirm('tem certeza', (confirmation) => {
      setConfirmClearhistory(confirmation);
      if (confirmation) {
        dispatch({ type: TaskActionTypes.RESET_STATE });
      }
    });
  }

  /*
  function handleClick() {
    setState((prevState) => {
      //em state, nos sabemos que tem dois tipos são mutaveis: objetos e array; então muda diretamente esses objetos é uma má pratica no react
      // prevState.secondsRemaining= 1;
      return { ...prevState, secondsRemaining: 100 };
    });
  }
  */

  useEffect(() => {
    return () => {
      showMessage.dismiss();
    };
  }, []);

  useEffect(() => {
    document.title = 'Histórico pomodora';
  }, []);

  useEffect(() => {
    if (!confirmClearhistory) return;

    setConfirmClearhistory(false);

    // dispatch({ type: TaskActionTypes.RESET_STATE });
  }, [confirmClearhistory]);

  useEffect(() => {
    setSortedTasks((prevState) => ({
      tasks: sortTasks({
        tasks: state.tasks,
        direction: prevState.direction,
        field: prevState.field,
      }),
    }));
  }, [state.tasks]);

  return (
    <MainTemplate>
      {/* aqui tem o conceito prop drilling => quando vc passa props para um componente, depois passa pra outro componentes assim sucessivamente, em que nesse compoenentes vc n usa a props, mas só passa paté que chega o compoenente que realmente vai usar  */}
      {/* <CountDown state={state} /> */}
      <h1 className={`container ${styles['heading']}`}>
        <span>Hístorico</span>
        {hasTasks && (
          <span className={styles['button-container']}>
            <DefaultButton
              icon={<TrashIcon />}
              color="red"
              title="apagar historico"
              aria-label="apagar historico"
              onClick={handleResetHistory}
            />
          </span>
        )}
      </h1>
      {hasTasks && (
        <div className={`container ${styles['responsive-table']}`}>
          <table>
            <thead>
              <tr>
                <th
                  onClick={() => handleSortTasks({ field: 'name' })}
                  className={styles['thSort']}
                >
                  Tarefa ↕
                </th>
                <th
                  onClick={() => handleSortTasks({ field: 'duration' })}
                  className={styles['thSort']}
                >
                  Duração ↕
                </th>
                <th
                  onClick={() => handleSortTasks({ field: 'startDate' })}
                  className={styles['thSort']}
                >
                  Data ↕
                </th>
                <th>Status</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {sortedTasks.tasks.map((task) => {
                return (
                  <tr key={crypto.randomUUID()}>
                    <td>{task.name}</td>
                    <td>{task.duration}min</td>
                    <td>{formatDate(task.startDate)}</td>
                    <td>{getTaskStatus(task, state.activeTask)}</td>
                    <td>{getTaskType(task.type)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {!hasTasks && (
        <p style={{ textAlign: 'center', fontSize: '16px' }}>
          Ainda não existem tarefas criadas.
        </p>
      )}
    </MainTemplate>
  );
}
