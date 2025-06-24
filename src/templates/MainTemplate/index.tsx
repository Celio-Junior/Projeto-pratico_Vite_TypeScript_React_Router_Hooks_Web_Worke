import { JSX, ReactNode } from 'react';
import { Header } from './../../components/Header';
import { Footer } from './../../components/Footer';

type MainTemplateProps = {
  children: ReactNode;
};

export function MainTemplate({ children }: MainTemplateProps): JSX.Element {
  // se for mais de uma linha colocar parênteses e tem que um elemento pai(elemento principal) do componente
  // lebrando que componente tem que retornar unico elemento
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
