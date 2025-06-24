import { TaskStateModel } from '../models/TaskStateModel';

let isRunning = false;

self.onmessage = function (event: MessageEvent<TaskStateModel>) {
  /*
  console.log('worker recebeu a mensagem', event.data);
  self.postMessage('Olá pai');
  */

  if (isRunning) return;
  isRunning = true;

  const state = event.data;
  const { activeTask, secondsRemaining } = state;

  if (!activeTask) return;
  const enDate = activeTask.startDate + secondsRemaining * 1000;
  function tick() {
    const now = Date.now();
    const coutdownSeconds = Math.round((enDate - now) / 1000);

    self.postMessage(coutdownSeconds);

    setTimeout(tick, 1000);
  }
  tick();
};
