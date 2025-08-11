export const daysLeft = (deadline) => {
  const now = new Date();
  const d = new Date(deadline);
  return Math.ceil((d - now) / (1000 * 60 * 60 * 24));
};

export const isOverdue = (deadline) => daysLeft(deadline) < 0;