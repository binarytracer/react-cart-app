import { createContext, useReducer, useState } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";

export const items = [];

export const CartContext = createContext({
  items,
  addItemToCart: () => {},
  updateCartQty: () => {},
});

function shoppingCartReducer(prevShoppingCart, action) {
  const { payload } = action;

  if (action.type === "ADD_ITEM") {
    const updatedItems = [...prevShoppingCart.items];

    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === payload.id
    );
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      const product = DUMMY_PRODUCTS.find(
        (product) => product.id === payload.id
      );
      updatedItems.push({
        id: payload.id,
        name: product.title,
        price: product.price,
        quantity: 1,
      });
    }

    return {
      ...prevShoppingCart,
      items: updatedItems,
    };
  }

  if (action.type === "ADD_ITEM") {
    const updatedItems = [...prevShoppingCart.items];
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === payload.productId
    );

    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };

    updatedItem.quantity += payload.amount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return {
      ...prevShoppingCart,
      items: updatedItems,
    };
  }
  return state;
}

export default function CartContextProvider(props) {
  const { children } = props;
  const [shoppingCartState, shoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    {
      items,
    }
  );

  const [shoppingCart, setShoppingCart] = useState({
    items,
  });

  function handleAddItemToCart(id) {
    shoppingCartDispatch({
      type: "ADD_ITEM",
      payload: { id },
    });
  }

  function handleUpdateCartItemQuantity(id, amount) {
    shoppingCartDispatch({
      type: "ADD_ITEM",
      payload: {
        id,
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
