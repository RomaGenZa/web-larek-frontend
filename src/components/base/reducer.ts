import { ActionType, IAction } from "./action";
import IProduct from "./models/IProduct";

export interface IState {
  products: IProduct[] | null;
}

export const initialState: IState = {
  products: null,
};

export const reducer = (state = initialState, action: IAction): IState => {
  switch (action.type) {
    case ActionType.SetProducts:
      return { ...state, products: action.payload };
    default:
      return state;
  }
};