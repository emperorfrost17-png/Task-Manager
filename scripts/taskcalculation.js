import { tasks } from "./store.js";

export function totalTaskCalculation() {
  const totalNumber = document.querySelector(".js-total-number");
  const activeNumber = document.querySelector(".js-active-number");
  const completedNumber = document.querySelector(".js-completed-number");
  const overdueNumber = document.querySelector(".js-overdue-number");

  if (totalNumber) totalNumber.innerHTML = tasks.length;
  const allTasksCount = document.querySelector(".js-all-tasks-count");
  if (allTasksCount) allTasksCount.innerHTML = tasks.length;
  if (activeNumber)
    activeNumber.innerHTML = tasks.filter((task) => !task.completed).length;
  if (completedNumber)
    completedNumber.innerHTML = tasks.filter((task) => task.completed).length;
  const activeTasksCount = document.querySelector(".js-active-tasks-count");
  if (activeTasksCount)
    activeTasksCount.innerHTML = tasks.filter((task) => !task.completed).length;
  const completedTaskCount = document.querySelector(
    ".js-completed-tasks-count",
  );
  if (completedTaskCount)
    completedTaskCount.innerHTML = tasks.filter(
      (task) => task.completed,
    ).length;
  const overdueTasksCount = document.querySelector(".js-overdue-tasks-count");
  if (overdueTasksCount) {
    const currentDate = new Date();
    overdueTasksCount.innerHTML = tasks.filter(
      (task) => !task.completed && new Date(task.dueDate) < currentDate,
    ).length;
  }
  if (overdueNumber) {
    const currentDate = new Date();
    overdueNumber.innerHTML = tasks.filter(
      (task) => !task.completed && new Date(task.dueDate) < currentDate,
    ).length;
  }
  const lowPriorityCount = document.querySelector(".js-low-priority-count");
  if (lowPriorityCount)
    lowPriorityCount.innerHTML = tasks.filter(
      (task) => task.priority.toLowerCase() === "low" && !task.completed,
    ).length;
  const mediumPriorityCount = document.querySelector(
    ".js-medium-priority-count",
  );
  if (mediumPriorityCount)
    mediumPriorityCount.innerHTML = tasks.filter(
      (task) => task.priority.toLowerCase() === "medium" && !task.completed,
    ).length;
  const highPriorityCount = document.querySelector(".js-high-priority-count");
  if (highPriorityCount)
    highPriorityCount.innerHTML = tasks.filter(
      (task) => task.priority.toLowerCase() === "high" && !task.completed,
    ).length;
}
 export function calculateOverallProgress(number) {
  const progressElement = document.querySelector(".js-overall-progress");
  const totalTasks = tasks.length;
  const overallProgressPercent = totalTasks > 0 ? (number / totalTasks) * 100 : 0;
  if (progressElement) {
    progressElement.innerHTML = `${Math.round(overallProgressPercent)}%`;
  }
  return progressElement;
}
export function calculateOverallProgressBar(number) {
  const progressBar = document.querySelector(".progress-bar");
  const totalTasks = tasks.length;
  const overallProgressPercent = totalTasks > 0 ? (number / totalTasks) * 100 : 0;
  if (progressBar) {
    progressBar.style.width = `${Math.round(overallProgressPercent)}%`;
  }
  return progressBar;
}
