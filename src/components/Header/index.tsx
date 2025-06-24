import { Logo } from '../Logo';
import { Menu } from '../Menu';
import styles from './style.module.css';
export const Header = () => {
  //react não ta olhando pra ela, pois em outros componentes não vai aparecer atualizado, isso se chma efeito colateral(quando acontece fora do react, quando ele nãoi sabe ta acotecendo)
  // let number = 0;

  /*
  const [number, setNumber] = useState(0);
  function cont() {
    // number++;
    setNumber((valor) => valor + 1);
    console.log('numero:', number);
  }
  */

  return (
    <header className={`container ${styles['header']}`}>
      <Logo />
      <Menu />
    </header>
  );
};
