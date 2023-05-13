import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotal =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIdx = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingItem = state.items[existingCartItemIdx];

    let updatedItems;

    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount
      }
      updatedItems = [...state.items];
      updatedItems[existingCartItemIdx] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotal,
    };
  }
  if (action.type === 'REMOVE') {
    const existingCartItemIdx = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIdx];
    const updatedTotal =
      state.totalAmount - existingItem.price;

      let updatedItems;
      if (existingItem.amount === 1) {
        updatedItems = state.items.filter(item => item.id !== action.id);
      } else {
        const updatedItem = {...existingItem, amount: existingItem.amount - 1 };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIdx] = updatedItem;
      }
      return {
        items: updatedItems,
        totalAmount: updatedTotal,
      };
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({
      type: "ADD",
      item: item,
    });
  };
  const removeItemToCartHandler = (id) => {
    dispatchCartAction({
      type: "REMOVE",
      id: id,
    });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItems: removeItemToCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
