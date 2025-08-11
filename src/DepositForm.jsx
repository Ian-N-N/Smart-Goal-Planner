import React, { useState } from "react";

export default function DepositForm({ goal, onDeposit }) {
  const [amount, setAmount] = useState("");

  const submit = () => {
    const num = Number(amount);
    if (!num || num <= 0) return;
    onDeposit(goal.id, num);
    setAmount("");
  };

  return (
    <div className="controls">
      <input type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
      <button onClick={submit}>Deposit</button>
    </div>
  );
}