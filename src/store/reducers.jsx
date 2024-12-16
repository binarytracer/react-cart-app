import { DUMMY_PRODUCTS } from "../dummy-products";

export function shoppingCartReducer(prevShoppingCart, action) {
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

  if (action.type === "UPDATE_QTY") {
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

  return prevShoppingCart;
}
