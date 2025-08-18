import React, { useEffect, useState } from "react";
import GoalOverview from "./GoalOverview";
import GoalForm from "./GoalForm";
import GoalList from "./GoalList";

export default function App() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = "http://localhost:3001/goals";

  // Load all goals
  useEffect(() => {
    (async () => {
      try {//try...catch as part of error handling
        const res = await fetch(BASE_URL);
        if (!res.ok) throw new Error("Failed to fetch goals");
        const data = await res.json();
        setGoals(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Add new goal
  const addGoal = async (goal) => {
    try {
      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(goal),
      });
      if (!res.ok) throw new Error("Failed to create goal");
      const newGoal = await res.json();
      setGoals((prev) => [...prev, newGoal]);
    } catch (err) {
      console.error(err);
    }
  };

  // Updating the goals
  const patchGoal = async (id, patch) => {//async function which updates goals in the database
    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (!res.ok) throw new Error("Failed to update goal");//check if request was accepted or not
      const updated = await res.json();
      setGoals((prev) => prev.map((g) => (g.id === id ? updated : g)));
    } catch (err) {
      console.error(err);
    }
  };

  // Deleting the goals
  const removeGoal = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete goal");
      setGoals((prev) => prev.filter((g) => g.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Deposit into a goal
  const handleDeposit = async (id, amount) => {
    const goal = goals.find((g) => g.id === id);
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

      <main style={{ marginTop: 16 }}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <GoalList
            goals={goals}
            onDeposit={handleDeposit}
            onEdit={patchGoal}
            onDelete={removeGoal}
          />
        )}
      </main>
    </div>
  );
}