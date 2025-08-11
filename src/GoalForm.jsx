import React, { useState } from "react";

export default function GoalForm({ onAdd }) {
  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !targetAmount || !deadline) return;
    const newGoal = {
      // json-server will create an id if not provided, but we add a timestamp id to be safe
      id: Date.now().toString(),
      name,
      targetAmount: Number(targetAmount),
      savedAmount: 0,
      category: category || "General",
      deadline,
      createdAt: new Date().toISOString().slice(0,10)
    };
    onAdd(newGoal);
    setName(""); setTargetAmount(0); setCategory(""); setDeadline("");
  };

  return (
    <div className="card">
      <h3>Add New Goal</h3>
      <form onSubmit={handleSubmit} className="grid">
        <input placeholder="Goal name" value={name} onChange={e => setName(e.target.value)} />
        <input type="number" placeholder="Target amount" value={targetAmount} onChange={e => setTargetAmount(e.target.value)} />
        <input placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
        <input type="date" value={deadline} onChange={e => setDeadline(e.target.value)} />
        <button type="submit">Add Goal</button>
      </form>
    </div>
  );
}