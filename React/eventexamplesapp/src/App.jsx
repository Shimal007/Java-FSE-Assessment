import React, { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [amount, setAmount] = useState(17);
  const [currency, setCurrency] = useState("Euro");

  const handleIncrement = () => setCount((prevCount) => prevCount + 1);
  const handleDecrement = () => setCount((prevCount) => prevCount - 1);
  const handleWelcome = () => alert("Welcome");
  const handleClickMe = () => alert("Clicked!");

  const handleSubmit = (event) => {
    event.preventDefault();
    const converted = Number(amount) * 80;
    alert(`Converting to ${currency} Amount is ${converted}`);
  };

  return (
    <div className="page-container">
      <div className="controls">
        <div className="count-display">{count}</div>
        <button onClick={handleIncrement}>Increment</button>
        <button onClick={handleDecrement}>Decrement</button>
        <button onClick={handleWelcome}>Say welcome</button>
        <button onClick={handleClickMe}>Click on me</button>
      </div>

      <div className="converter">
        <h1>Currency Convertor!!!</h1>
        <form onSubmit={handleSubmit}>
          <div className="field-row">
            <label>Amount:</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="field-row">
            <label>Currency:</label>
            <textarea
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              rows="1"
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;