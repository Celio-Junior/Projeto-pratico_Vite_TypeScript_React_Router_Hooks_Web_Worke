import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import styles from './style.module.css';

export function CountDown() {
  const { state } = useTaskContext();
  return <p className={`container ${styles['count']}`}>{state.formattedSecondRemaining}</p>;
}
