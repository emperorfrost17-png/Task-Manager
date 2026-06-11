import { tasks } from "./main.js";
import { renderPage } from "./main.js";
<<<<<<< HEAD

const date = new Date();
console.log(date)
const activeTask = [];

=======
>>>>>>> 205abc3651b8dc2d3bce9366db17ad7e48f53a3b
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
  renderPage();
}
<<<<<<< HEAD
function isActiveTask() {}
=======
>>>>>>> 205abc3651b8dc2d3bce9366db17ad7e48f53a3b
