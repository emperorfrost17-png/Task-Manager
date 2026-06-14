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
      (task) => task.priority.toLowerCase() === "low",
    ).length;
}
