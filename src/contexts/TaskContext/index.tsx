// import { useContext } from 'react';

// import { TaskContext } from './TaskContext';

//valor que esta aqui, só é usado caso vc n usar o provider(ele fosse como placeholder)
// export const TaskContext = createContext<TaskContextProps>(initialContextValue);
// export const TaskContext = createContext({
//   key: 'value ahhh',
// });

/*
type TaskContextProviderProps = {
  children: ReactNode;
};

// vou usar compoenente que vai ter ter o provider, em vez fazer diretamente(pra ficar organizado)
export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, setState] = useState(initialTaskState);
  return <TaskContext.Provider value={{ state, setState }}>{children}</TaskContext.Provider>;
}
*/

//meu hook persolizado
/*
export const useTaskContext = () => {
  return useContext(TaskContext);
};
*/
