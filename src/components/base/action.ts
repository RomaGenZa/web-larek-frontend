import IProduct from "./models/IProduct";

export enum ActionType {
    SetProducts = "set_products"
}

export interface IAction {
  type: ActionType;
  payload?: any;
}

export const setProducts = (products: IProduct[]): IAction => ({
  type: ActionType.SetProducts,
  payload: products,
});
