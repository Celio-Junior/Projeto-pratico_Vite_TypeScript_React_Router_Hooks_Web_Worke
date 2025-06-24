import { JSX, ReactNode } from 'react';
import styles from './styles.module.css';

interface GenericHtmlProps {
  children: ReactNode;
}

export function GenericHtml({ children }: GenericHtmlProps): JSX.Element {
  return <div className={`container ${styles['genericHtml']}`}>{children}</div>;
}
