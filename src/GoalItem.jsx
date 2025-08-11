import React from "react";
import DepositForm from "./DepositForm";
import { daysLeft } from "./dateUtils";

export default function GoalItem({ goal, onDeposit, onEdit, onDelete }) {
  const percentage = Math.min((goal.savedAmount / goal.targetAmount) * 100, 100);
  const remaining = Math.max(goal.targetAmount - goal.savedAmount, 0);
  const dl = daysLeft(goal.deadline);

  return (
    <div className={`card goal-item ${goal.savedAmount >= goal.targetAmount ? "complete" : ""}`}>
      <h3>{goal.name}</h3>
      <div className="small">Category: {goal.category}</div>
      <div style={{marginTop:8}}>{goal.savedAmount} / {goal.targetAmount} KES</div>
      <div className="progress" style={{marginTop:8}}>
        <div className="bar" style={{ width: `${percentage}%` }}></div>
      </div>
      <div className="small">Remaining: KES {remaining} • Deadline: {goal.deadline} ({dl} days)</div>

      {dl <= 30 && goal.savedAmount < goal.targetAmount && <div className="warning">Deadline within 30 days</div>}
      {dl < 0 && goal.savedAmount < goal.targetAmount && <div className="warning">Overdue</div>}

      <DepositForm goal={goal} onDeposit={onDeposit} />

      <div className="controls">
        <button className="ghost" onClick={() => onDelete(goal.id)}>Delete</button>
          <button className="ghost" onClick={() => onEdit(goal.id)}>Edit</button>

      </div>
    </div>
  );
}
