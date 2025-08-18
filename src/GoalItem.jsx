import React, { useState } from "react";
import DepositForm from "./DepositForm";
import { daysLeft } from "./dateUtils";

export default function GoalItem({ goal, onDeposit, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);

  // Copy the whole goal object for editing so that on can be able to cange all values 
  const [editGoal, setEditGoal] = useState({ ...goal });

  const percentage = Math.min((goal.savedAmount / goal.targetAmount) * 100, 100);
  const remaining = Math.max(goal.targetAmount - goal.savedAmount, 0);
  const dl = daysLeft(goal.deadline);

  const handleChange = (field, value) => {
    setEditGoal((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className={`card goal-item ${goal.savedAmount >= goal.targetAmount ? "complete" : ""}`}>
      {isEditing ? (
        <div>
          <input
            value={editGoal.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Goal name"
          />
          <input
            type="number"
            value={editGoal.targetAmount}
            onChange={(e) => handleChange("targetAmount", Number(e.target.value))}
            placeholder="Target amount"
          />
          <input
            type="number"
            value={editGoal.savedAmount}
            onChange={(e) => handleChange("savedAmount", Number(e.target.value))}
            placeholder="Saved amount"
          />
          <input
            type="date"
            value={editGoal.deadline}
            onChange={(e) => handleChange("deadline", e.target.value)}
          />
          <input
            value={editGoal.category}
            onChange={(e) => handleChange("category", e.target.value)}
            placeholder="Category"
          />

          <button
            onClick={() => {
              onEdit(goal.id, editGoal);
              setIsEditing(false);
            }}
          >
            Save
          </button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <>
          <h3>{goal.name}</h3>
          <div className="small">Category: {goal.category}</div>
          <div style={{ marginTop: 8 }}>
            {goal.savedAmount} / {goal.targetAmount} KES
          </div>
          <div className="progress" style={{ marginTop: 8 }}>
            <div className="bar" style={{ width: `${percentage}%` }}></div>
          </div>
          <div className="small">
            Remaining: KES {remaining} • Deadline: {goal.deadline} ({dl} days)
          </div>
          {dl <= 30 && goal.savedAmount < goal.targetAmount && (
            <div className="warning">Deadline within 30 days</div>
          )}
          {dl < 0 && goal.savedAmount < goal.targetAmount && (
            <div className="warning">Overdue</div>
          )}
          <DepositForm goal={goal} onDeposit={onDeposit} />
          <div className="controls">
            <button className="ghost" onClick={() => onDelete(goal.id)}>Delete</button>
            <button className="ghost" onClick={() => {
              setEditGoal({ ...goal }); // reset edit form with current values
              setIsEditing(true);
            }}>Edit</button>
          </div>
        </>
      )}
    </div>
  );
}