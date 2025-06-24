import { ReactNode, useEffect, useReducer, useRef } from 'react';
import { initialTaskState } from './initialTaskContext';
import { TaskContext } from './TaskContext';
import { taskReducer } from './taskReducer';
import { TimerWorkerManage } from '../../workers/timerWorkerManager';
import { TaskActionTypes } from './taskActions';
import { loadBeep } from '../../utils/loadBeep';
import { TaskStateModel } from '../../models/TaskStateModel';

type TaskContextProviderProps = {
  children: ReactNode;
};
// vou usar compoenente que vai ter ter o provider, em vez fazer diretamente(pra ficar organizado)
export function TaskContextProvider({ children }: TaskContextProviderProps) {
  //no reduce tu pode igual no state, colocar uma função, qoeu no reduce tu pode fazer inicialização no terceior arg
  const [state, dispatch] = useReducer(taskReducer, initialTaskState, () => {
    const storageState = localStorage.getItem('state');

    if (!storageState) return initialTaskState;

    const parsedStorageState = JSON.parse(storageState) as TaskStateModel;

    return {
      ...parsedStorageState,
      activeTask: null,
      secondsRemaining: 0,
      formattedSecondRemaining: '00:00',
    };
  });

  // const playBeepRef = useRef<() => void | null>(null);
  const playBeepRef = useRef<ReturnType<typeof loadBeep> | null>(null);

  /*
  type ActionType = {
    type: string;
    payload?: number;
  };

  // tem dois paramentros o primeiro é uma função e o segundo é o estado inicial;
  // o retorno é vias desustruturação via array, que non primeiro valor é o STATE e o segundo é o DISPATCH(pra disparar ações e ele é uma função)
  const [myNumber, dispatch] = useReducer(
    (state, action: ActionType) => {
      console.log('state: %o e \naction: %o', state, action);

      //isso é padrão com o reducer(usando switch)
      //DETALHE: AS ACTIONS GERALMENTE SÃO OBJECTS
      switch (action) {
        case 'oque eu quero meu nobre':
          return state + 1;
          case 'DECREMENT':
            return state - 1;
          }


         switch (action.type) {
           case 'increment': {
             if (!action.payload) return state;
             return {
               ...state,
               seconds: state.seconds + action.payload,
              };
            }
            case 'decrement': {
              if (!action.payload) return state;
              return {
            ...state,
            seconds: state.seconds - action.payload,
          };
        }

        case 'reset': {
          return {
            ...state,
            seconds: 0,
          };
        }
      }
      // SEMPREEE SEU REDUCE tem que RETORNAR O STATE(atual ou atualizado)
      return state;
    },
    {
      seconds: 0,
    },
  );
  */

  const worker = TimerWorkerManage.getInstance();
  worker.onmessage((e) => {
    const countDownSeconds = e.data;

    if (countDownSeconds <= 0) {
      if (playBeepRef.current) {
        playBeepRef.current();
        playBeepRef.current = null;
      }

      dispatch({
        type: TaskActionTypes.COMPLETE_STATE,
      });
      worker.terminate();
    } else {
      dispatch({
        type: TaskActionTypes.COUNT_DOWN,
        payload: { secondsRemaining: countDownSeconds },
      });
    }
  });

  useEffect(() => {
    localStorage.setItem('state', JSON.stringify(state));
    if (!state.activeTask) {
      worker.terminate();
    }

    document.title = `${state.formattedSecondRemaining} - Pomodora`;

    worker.postMessage(state);
  }, [state, worker]);

  useEffect(() => {
    if (state.activeTask && playBeepRef.current === null) {
      playBeepRef.current = loadBeep();
    } else {
      playBeepRef.current = null;
    }
  }, [state.activeTask]);

  /*
  return (
    <TaskContext.Provider value={{ state, setState }}>
    <h1>testando reduce</h1>
    <h2>O state é {JSON.stringify(myNumber)} </h2>
    <button
    type="button"
    onClick={() => {
          dispatch({ type: 'increment', payload: 2 });
        }}
      >
      Incrementar
      </button>
      <button
      type="button"
      onClick={() => {
        dispatch({ type: 'decrement', payload: 2 });
      }}
      >
      Decrementar
      </button>
      <button
      type="button"
      onClick={() => {
        dispatch({ type: 'reset' });
      }}
      >
      Reset
      </button>
      </TaskContext.Provider>
    );
    */
  return <TaskContext.Provider value={{ state, dispatch }}>{children}</TaskContext.Provider>;
}
