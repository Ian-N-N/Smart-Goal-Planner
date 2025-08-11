import React, { useEffect, useState } from "react";
import { fetchGoals, createGoal, updateGoal, deleteGoal } from "./api";
import GoalOverview from "./GoalOverview";
import GoalForm from "./GoalForm";
import GoalList from "./GoalList";

export default function App() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchGoals();
        setGoals(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const addGoal = async (goal) => {
    const res = await createGoal(goal);
    setGoals(prev => [...prev, res.data]);
  };

  const patchGoal = async (id, patch) => {
    const res = await updateGoal(id, patch);
    setGoals(prev => prev.map(g => g.id === id ? res.data : g));
  };

  const removeGoal = async (id) => {
    await deleteGoal(id);
    setGoals(prev => prev.filter(g => g.id !== id));
  };

  const handleDeposit = async (id, amount) => {
    const goal = goals.find(g => g.id === id);
    if (!goal) return;
    const updated = { savedAmount: Number(goal.savedAmount) + Number(amount) };
    await patchGoal(id, updated);
  };

  return (
    <div className="container">
      <header>
        <h1>Smart Goal Planner</h1>
      </header>

      <div className="grid columns-3">
        <GoalOverview goals={goals} />
        <div className="card">
          <h3>Create Goal</h3>
          <GoalForm onAdd={addGoal} />
        </div>
      </div>

      <main style={{marginTop:16}}>
        {loading ? <div>Loading...</div> : (
          <GoalList goals={goals} onDeposit={handleDeposit} onEdit={patchGoal} onDelete={removeGoal} />
        )}
      </main>
    </div>
  );
}
