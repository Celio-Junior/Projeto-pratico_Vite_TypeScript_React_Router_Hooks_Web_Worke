import { TimerIcon } from 'lucide-react';
import styles from './style.module.css';
import { RouterLink } from '../../RouterLink';

export const Logo = () => {
  return (
    <h1 className={styles['logo']}>
      <RouterLink href="/" className={styles['logo-link']}>
        <TimerIcon />
        <span>Chronos</span>
      </RouterLink>
    </h1>
  );
};
