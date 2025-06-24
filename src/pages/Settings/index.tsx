import { FormEvent, JSX, useEffect, useRef } from 'react';
import { MainTemplate } from '../../templates/MainTemplate';
import styles from './styles.module.css';
import formStyle from './../../components/MainForm/styles.module.css';
import { Input } from '../../components/Input';
import { DefaultButton } from '../../components/DefaultButton';
import { SaveIcon } from 'lucide-react';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { showMessage } from '../../adapters/showMessages';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';
// export default function Home({ state }: HomeProps): JSX.Element {
export default function Settings(): JSX.Element {
  // console.log(state);
  const { state, dispatch } = useTaskContext();
  const workTimeInputRef = useRef<HTMLInputElement>(null);
  const shortBreakTimeInputRef = useRef<HTMLInputElement>(null);
  const longBreakTimeInputRef = useRef<HTMLInputElement>(null);

  function handleSaveConfig(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    showMessage.dismiss();

    const formErros: string[] = [];

    const workTime = Number(workTimeInputRef.current?.value);
    const shortBreakTime = Number(shortBreakTimeInputRef.current?.value);
    const longBreakTime = Number(longBreakTimeInputRef.current?.value);

    const camposArray = [workTime, shortBreakTime, longBreakTime];

    camposArray.forEach((campo, i) => {
      if (isNaN(campo)) formErros.push('Use apenas números para todos os campos');

      if (i === 1 && (campo < 1 || campo > 30)) formErros.push('Digite valores entre 1 a 30');
      if (i === 2 && (campo < 1 || campo > 45)) formErros.push('Digite valores entre 1 a 45');

      if (i === 0 && (campo < 1 || campo > 30)) formErros.push('Digite valores entre 1 a 60');
    });

    if (formErros.length > 0) {
      formErros.forEach((error) => {
        showMessage.error(error);
      });
      return;
    }

    dispatch({
      type: TaskActionTypes.CHANGE_SETTINGS,
      payload: {
        workTime,
        shortBreakTime,
        longBreakTime,
      },
    });
    showMessage.sucess('Configurações salva meu nobre');
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
    document.title = 'Configurações pomodora';
  }, []);

  return (
    <MainTemplate>
      {/* aqui tem o conceito prop drilling => quando vc passa props para um componente, depois passa pra outro componentes assim sucessivamente, em que nesse compoenentes vc n usa a props, mas só passa paté que chega o compoenente que realmente vai usar  */}
      {/* <CountDown state={state} /> */}
      <h1 className={`container ${styles.heading}`}>Configurações</h1>
      <p className="container" style={{ textAlign: 'center' }}>
        Aqui estás as configurações
      </p>

      <form onSubmit={handleSaveConfig} className={`container ${formStyle['form']}`}>
        <div className={formStyle['form-row']}>
          <Input
            id="workTime"
            label="Foco"
            ref={workTimeInputRef}
            defaultValue={state.config.workTime}
            type="text"
          />
        </div>
        <div className={formStyle['form-row']}>
          <Input
            id="shortBreakTime"
            label="Descanso curto"
            ref={shortBreakTimeInputRef}
            defaultValue={state.config.shortBreakTime}
            type="text"
          />
        </div>
        <div className={formStyle['form-row']}>
          <Input
            id="longBreakTime"
            label="Descanso longo"
            ref={longBreakTimeInputRef}
            defaultValue={state.config.longBreakTime}
            type="text"
          />
        </div>
        <div className={formStyle['form-row']}>
          <DefaultButton
            type="submit"
            icon={<SaveIcon />}
            aria-label="salvar configurações"
            title="salvar"
          />
        </div>
      </form>
    </MainTemplate>
  );
}
