import { tasks } from "./store.js";


const date = new Date();
console.log(date)
const activeTask = [];


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
  const activeTasksCount = document.querySelector(".js-active-tasks-count");
  if (activeTasksCount)
    activeTasksCount.innerHTML = tasks.filter((task) => !task.completed).length;
}



