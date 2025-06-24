import { Link } from 'react-router';
import styles from './styles.module.css';
export function Footer() {
  return (
    <footer className={`container ${styles['footer']}`}>
      <ul>
        <li>
          <Link to="/about-pomodora">Entenda a tecnica do pomodora</Link>
        </li>
        <li>
          <Link to="/">Chronos Pomodoro &copy; {new Date().getFullYear()} feito com 💚</Link>
        </li>
      </ul>
    </footer>
  );
}
