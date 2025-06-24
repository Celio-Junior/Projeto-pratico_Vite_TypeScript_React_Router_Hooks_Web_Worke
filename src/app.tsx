import { JSX } from 'react';
import './styles/global.css';
import { TaskContextProvider } from './contexts/TaskContext/TaskContextProvider';
import MessagesContainer from './MessagesContainer';
import { MainRouter } from './routes/MainRouter';

// import { About } from './pages/About';

// não precisa tipar manualmente, propio typescript coloca manualmente

// componente => sao funçoes que retornar, lembra que "pascal case"
export default function App(): JSX.Element {
  // se for mais de uma linha colocar parênteses e tem que um elemento pai(elemento principal) do componente
  // lebrando que componente tem que retornar unico elemento

  return (
    //react fragments
    <>
      {/* Provider ele prover pra todos os componentes estão dentro do provier(assim como o componente e seus filho a ter ceacesso) */}
      {/* <TaskContext.Provider value={{ meuProvider: 'iai' }}>
        <Home />
      </TaskContext.Provider> */}
      {/* <About /> */}
      <TaskContextProvider>
        <MessagesContainer>
          <MainRouter />
        </MessagesContainer>
      </TaskContextProvider>
    </>
  );
}

// sobre hooks
// funcioamento dos hooks
/*
=> funcimonamento do react hooks flows:

- rendering? =>  "ATO de obter  um produto atráves de processamento digital" => no react => transformação do componente em DOM Node.

- conceito => "Não comparar hooks com classes".

- 3 estapas =>
  * Mount => componente é exibido na tela
  * Update => quando? =>
    - quando o estado do componente é alterado.
    - quando o componente pai é renderizado.
    - quando o componente recebe novas props
    - Alterações nos contextos
  * Unmount => quando o componente é removido da tela.

- Ciclos de rendering  => Render batching =>
  * conceito original: é uma técnica usada em gráficos de computador para otimizar o processo de renderização, agrupando várias operações de desenho em um único lote (batch). Isso reduz a quantidade de chamadas de desenho enviadas para a GPU, melhorando o desempenho

  * no react: se refere à otimização do processo de renderização, agrupando várias atualizações de estado em um único ciclo de renderização. Isso ajuda a melhorar o desempenho da aplicação, evitando renderizações desnecessárias.
*/
