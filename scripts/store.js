const savedTasks = localStorage.getItem("tasks");
// Initialize the tasks array with saved tasks or an empty array
export const tasks = savedTasks ? JSON.parse(savedTasks) : [];

export function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

export let currentEditingIndex = null;
export function setCurrentEditingIndex(index) {
  currentEditingIndex = index;
}