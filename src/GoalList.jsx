import React, { useState } from "react";
import GoalItem from "./GoalItem";

export default function GoalList({ goals, onDeposit, onEdit, onDelete }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(goals.map(g => g.category)))];

  const itemsToDisplay = selectedCategory === "All" ? goals : goals.filter(g => g.category === selectedCategory);

  return (
    <div>
      <div style={{marginBottom:12}} className="card">
        <label className="small">Filter:</label>
        <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="grid">
        {itemsToDisplay.map(g => (
          <GoalItem key={g.id} goal={g} onDeposit={onDeposit} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
}
