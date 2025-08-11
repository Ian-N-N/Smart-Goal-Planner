import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:3000" });

export const fetchGoals = () => API.get("/goals");
export const createGoal = (goal) => API.post("/goals", goal);
export const updateGoal = (id, patch) => API.patch(`/goals/${id}`, patch);
export const deleteGoal = (id) => API.delete(`/goals/${id}`);