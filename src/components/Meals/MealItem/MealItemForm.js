import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import { useRef, useState } from 'react';

const MealItemForm = (props) => {
  const amountInputRef = useRef();
  const [amtValid, setAmtValid] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNum = +enteredAmount;

    if (enteredAmount.trim().length === 0 ||
    enteredAmountNum < 1 || enteredAmountNum > 5) {
      setAmtValid(false);
      return;
    }
    props.onAddToCart(enteredAmountNum);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      ></Input>
      <button>+ Add</button>
      {!amtValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
