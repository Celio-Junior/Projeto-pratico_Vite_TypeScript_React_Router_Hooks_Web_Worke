import { JSX } from 'react';
import { MainTemplate } from '../../templates/MainTemplate';
import { CountDown } from '../../components/CountDown';
import { MainForm } from '../../components/MainForm';

// export default function Home({ state }: HomeProps): JSX.Element {
export default function Home(): JSX.Element {
  // console.log(state);

  /*
  function handleClick() {
    setState((prevState) => {
      //em state, nos sabemos que tem dois tipos são mutaveis: objetos e array; então muda diretamente esses objetos é uma má pratica no react
      // prevState.secondsRemaining= 1;
      return { ...prevState, secondsRemaining: 100 };
    });
  }
  */
  return (
    <MainTemplate>
      {/* aqui tem o conceito prop drilling => quando vc passa props para um componente, depois passa pra outro componentes assim sucessivamente, em que nesse compoenentes vc n usa a props, mas só passa paté que chega o compoenente que realmente vai usar  */}
      {/* <CountDown state={state} /> */}
      <CountDown />
      <MainForm />
    </MainTemplate>
  );
}
