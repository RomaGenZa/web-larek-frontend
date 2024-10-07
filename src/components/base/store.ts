import { IAction } from "./action";
import { initialState, IState, reducer } from "./reducer";

class Store {
  private state: IState;
  private listeners: Array<() => void> = [];

  constructor(private reducer: (state:IState, action: IAction) => IState, initialState: IState) {
    this.state = initialState;
  }

  getState(): IState {
    return this.state;
  }

  dispatch(action: IAction) {
    this.state = this.reducer(this.state, action);
    this.listeners.forEach(listener => listener());
  }

  subscribe(listener: () => void) {
    this.listeners.push(listener);
  }
}

export const store = new Store(reducer, initialState);

store.subscribe(() => {
  console.log('State updated:', store.getState());
});