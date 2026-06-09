 import { tasks } from "./main.js";
 import { renderPage } from "./main.js";
 
 export function totalTaskCalculation() {
  const totalNumber = document.querySelector(".js-total-number");
  const activeNumber = document.querySelector(".js-active-number");
  const completedNumber = document.querySelector(".js-completed-number");
  const overdueNumber = document.querySelector(".js-overdue-number");

  const totalTasks = tasks.length;
  totalNumber.innerHTML = totalTasks;
  document.querySelector(".js-all-tasks-count").innerHTML = totalTasks;
  renderPage();
}