import { tasks } from "./main.js";
import { renderPage } from "./main.js";

export function totalTaskCalculation() {
  const totalNumber = document.querySelector(".js-total-number");
  const activeNumber = document.querySelector(".js-active-number");
  const completedNumber = document.querySelector(".js-completed-number");
  const overdueNumber = document.querySelector(".js-overdue-number");

  if (totalNumber) totalNumber.innerHTML = tasks.length;
  const allTasksCount = document.querySelector(".js-all-tasks-count");
  if (allTasksCount) allTasksCount.innerHTML = tasks.length;
  renderPage();
}
