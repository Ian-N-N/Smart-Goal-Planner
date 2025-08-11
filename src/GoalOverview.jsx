import React from "react";
import { daysLeft, isOverdue } from "./dateUtils";

export default function GoalOverview({ goals }) {
  const totalGoals = goals.length;
  const totalSaved = goals.reduce((s, g) => s + Number(g.savedAmount), 0);
  const completed = goals.filter((g) => Number(g.savedAmount) >= Number(g.targetAmount)).length;

  return (
    <div className="card">
      <h2>Overview</h2>
      <div className="grid columns-3">
        <div>
          <div className="small">Total Goals</div>
          <div>{totalGoals}</div>
        </div>
        <div>
          <div className="small">Total Saved</div>
          <div>KES {totalSaved}</div>
        </div>
        <div>
          <div className="small">Completed</div>
          <div>{completed}</div>
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <h4>Deadlines</h4>
        {goals.slice(0,5).map(g => (
          <div key={g.id} className="small">
            {g.name} — {daysLeft(g.deadline)} days left {isOverdue(g.deadline) && <span className="warning">(Overdue)</span>}
          </div>
        ))}
      </div>
    </div>
  );
}