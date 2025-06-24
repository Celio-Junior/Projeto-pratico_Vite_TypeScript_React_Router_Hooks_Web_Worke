import { ComponentPropsWithRef } from 'react';
import styles from './styles.module.css';
type InputProps = {
  id: string;
  label: string;
} & ComponentPropsWithRef<'input'>;
//& ComponentProps<'input'>;
export function Input({ type, label, id, ...rest }: InputProps) {
  return (
    <>
      <label className={styles['label']} htmlFor={id}>
        {label}
      </label>
      <input id={id} type={type} className={styles['input']} {...rest} />
    </>
  );
}
