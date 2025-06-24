import { ComponentPropsWithoutRef, ReactNode } from 'react';
import styles from './styles.module.css';
type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  icon: ReactNode;
  color?: 'green' | 'red';
};
//& ComponentProps<'button'>;
export function DefaultButton({ type, icon, color = 'green', ...rest }: ButtonProps) {
  return (
    <>
      <button type={type} className={`${styles['button']} ${styles[color]}`} {...rest}>
        {icon}
      </button>
    </>
  );
}
