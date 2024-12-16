import { createContext } from "react";

export const items = [];

export const CartContext = createContext({
  items,
  addItemToCart: () => {},
  updateCartQty: () => {},
});
