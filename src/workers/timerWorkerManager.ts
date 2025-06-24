import { TaskStateModel } from '../models/TaskStateModel';

let instance: TimerWorkerManage | null = null;

export class TimerWorkerManage {
  private worker: Worker;

  private constructor() {
    this.worker = new Worker(new URL('./timerWorker.ts', import.meta.url), { type: 'module' });
  }

  static getInstance() {
    if (!instance) {
      instance = new TimerWorkerManage();
    }
    return instance;
  }

  postMessage(message: TaskStateModel) {
    this.worker.postMessage(message);
  }
  onmessage(cb: (e: MessageEvent) => void) {
    this.worker.onmessage = cb;
  }

  terminate() {
    this.worker.terminate();
    instance = null;
  }
}
