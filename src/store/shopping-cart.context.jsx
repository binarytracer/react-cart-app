import { createContext, useReducer } from "react";
import { shoppingCartReducer } from "./reducers";

const items = [];

const CartContext = createContext({
  items,
  addItemToCart: () => {},
  updateCartQty: () => {},
});

export default function CartContextProvider(props) {
  const { children } = props;
  const [shoppingCartState, shoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    {
      items,
    }
  );

  function handleAddItemToCart(id) {
    shoppingCartDispatch({
      type: "ADD_ITEM",
      payload: { id },
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    shoppingCartDispatch({
      type: "UPDATE_QTY",
      payload: {
        productId,
        amount,
      },
    });
  }

  const contextValue = {
    items: shoppingCartState.items,
    addItemToCart: handleAddItemToCart,
    updateCartQty: handleUpdateCartItemQuantity,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}
