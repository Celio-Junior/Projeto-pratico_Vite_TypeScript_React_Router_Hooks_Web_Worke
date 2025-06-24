import { MouseEvent, useEffect, useState } from 'react';
import { HistoryIcon, HouseIcon, MoonIcon, SettingsIcon, SunIcon } from 'lucide-react';

import styles from './style.module.css';
import { RouterLink } from '../../RouterLink';

type ThemaInterface = 'dark' | 'light';

export function Menu() {
  const [thema, setThema] = useState<ThemaInterface>(() => {
    const storageTheme = (localStorage.getItem('thema') ?? 'dark') as ThemaInterface;
    return storageTheme;
  });

  function handleThemaChange(e: MouseEvent<HTMLAnchorElement>): void {
    e.preventDefault();

    //use state DEVE USAR FUNÇÕES PURA(na maioria ddas casos, pra n dar efeito colateral)
    setThema((prevThema) => (prevThema === 'dark' ? 'light' : 'dark'));
  }

  //Use effect => pra efeito colaterais

  // é executado toda vez que o componente redenridazdo na tela
  /*
  useEffect(() => {
    console.log('useEffect sem dependências');
  });

  //executado quando esta no Mount(exibido na tela), que dizer, quandoi foi criado pela primeira vez
  useEffect(() => {
    console.log('useEffect só com array');
  }, []);

  */
  //  ele só executa quando monitora caso algum dados seja atulizado/modificado ele é chamado
  useEffect(() => {
    // console.log('useEffect como dependências');
    localStorage.setItem('thema', thema);
    document.documentElement.setAttribute('data-theme', thema);

    //aqui está retornando uma funcção(opcional), mas server pra tira sujeira do códigos, pois em alguns casos o useEffect pode gera sujeiras, por isso tem essa função(closure);
    // pois na proxima vez que chamar ele função que está sendo retornado vai ser excutado(esse itpo de função de clear up)
    // return () => {
    //   console.log('olha, este componente será atualizado');
    // };
  }, [thema]); // array de de depedências

  const nextThemaIcon = {
    dark: <SunIcon />,
    light: <MoonIcon />,
  };

  return (
    <nav className={styles['menu']}>
      <RouterLink
        className={styles['menu-link']}
        href="/"
        aria-label="Ir para home"
        title="Ir para home"
      >
        <HouseIcon />
      </RouterLink>
      <RouterLink
        className={styles['menu-link']}
        href="/history"
        aria-label="Ver Histórico"
        title="Ver Histórico"
      >
        <HistoryIcon />
      </RouterLink>
      <RouterLink
        className={styles['menu-link']}
        href="/settings"
        aria-label="Configurações"
        title="Configurações"
      >
        <SettingsIcon />
      </RouterLink>
      <a
        className={styles['menu-link']}
        aria-label="Mudar thema"
        title="Mudar thema"
        onClick={handleThemaChange}
      >
        {/* {thema === 'dark' ? <SunIcon /> : <MoonIcon />} */}
        {nextThemaIcon[thema]}
      </a>
    </nav>
  );
}
