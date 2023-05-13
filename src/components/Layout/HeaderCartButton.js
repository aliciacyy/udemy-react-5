import "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";
import { useContext, useEffect, useState } from "react";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);

  const noOfCartItems = cartCtx.items.reduce((currNum, item) => {
    return currNum + item.amount;
  }, 0);

  const[btnHighlight, setBtnHighlight] = useState(false);
  const btnClasses = `${classes.button} ${btnHighlight ? classes.bump : ''}`;
  
  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }
    setBtnHighlight(true);
    const timer = setTimeout(() => {
      setBtnHighlight(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    }
  }, [cartCtx.items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{noOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
