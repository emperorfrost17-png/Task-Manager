import { tasks, saveTasks } from "../store.js";
import { totalTaskCalculation } from "../taskcalculation.js";

let currentEditingIndex = null;

export function getCompletedTasks() {
  return tasks.filter((task) => task.completed);
}

const completedTaskList = document.querySelector(".js-completed-task-list");

export function renderCompletedTasks() {
  function renderTasks() {
    let taskCompletedHTML = "";
    getCompletedTasks().forEach((task) => {
      const actualIndex = tasks.indexOf(task);
      taskCompletedHTML += `<div class="task-item" data-index="${actualIndex}">
              <button class="task-check js-task-check" aria-label="Mark task as completed" data-index="${actualIndex}" style="display: ${task.completed ? "none" : "inline"}">
                <i class="fa-regular fa-circle"></i>
              </button>
              <button class="task-check js-task-uncheck" aria-label="Mark task as not completed" data-index="${actualIndex}" style="display: ${task.completed ? "inline" : "none"}">
                <i class="fa-solid fa-circle-check" style="color: rgb(99, 230, 99);"></i>
              </button>
              <div class="task-item-content">
                <h3>${task.title}</h3>
                <p class="task-description">${task.description}</p>
                <div class="task-meta">
                  <span class="task-priority-${task.priority.toLowerCase()}">${task.priority}</span>
                  <span class="due-date"><i class="fa-regular fa-calendar"></i> ${new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                  <span class="task-category">${task.category}</span>
                </div>
              </div>
              <div class="task-actions">
                <button aria-label="Edit task" class="js-edit-button" data-index="${actualIndex}">
                  <i class="fa-regular fa-pen-to-square"></i>
                </button>
                <button aria-label="Delete task" class="js-delete-button" data-index="${actualIndex}">
                  <i class="fa-regular fa-trash-can"></i>
                </button>
              </div>
            </div>`;
    });
    if (completedTaskList) completedTaskList.innerHTML = taskCompletedHTML;
  }
  renderTasks();
}

if (completedTaskList) {
  completedTaskList.addEventListener("click", (e) => {
    const deleteBtn = e.target.closest(".js-delete-button");
    const editBtn = e.target.closest(".js-edit-button");
    const checkBtn = e.target.closest(".js-task-check");
    const uncheckBtn = e.target.closest(".js-task-uncheck");

    if (checkBtn) {
      const index = Number(checkBtn.dataset.index);
      tasks[index].completed = true;
      saveTasks();
      totalTaskCalculation();
      renderCompletedTasks();
    }

    if (uncheckBtn) {
      const index = Number(uncheckBtn.dataset.index);
      tasks[index].completed = false;
      saveTasks();
      totalTaskCalculation();
      renderCompletedTasks();
    }

    if (deleteBtn) {
      const index = Number(deleteBtn.dataset.index);
      tasks.splice(index, 1);
      saveTasks();
      totalTaskCalculation();
      renderCompletedTasks();
    }

    if (editBtn) {
      const index = Number(editBtn.dataset.index);
      currentEditingIndex = index;
      const task = tasks[index];
      document.querySelector(".edit-title").value = task.title;
      document.querySelector(".edit-description").value = task.description;
      document.querySelector(".edit-priority").value = task.priority;
      document.querySelector(".edit-due-date").value = task.dueDate;
      document.querySelector(".edit-category").value = task.category;
      document.querySelector(".js-edit-task-modal").style.display = "flex";
    }
  });
  const clearCompletedButton = document.querySelector(".js-clear-completed");
  if (clearCompletedButton) {
    clearCompletedButton.addEventListener("click", () => {
      // tasks.filter() creates a NEW array of only incomplete tasks, but we can't just reassign
      // tasks = filteredArray because tasks is an imported reference from store.js — reassigning
      // it would only update the local variable, leaving the original array in store.js untouched.
      // Instead, tasks.splice(0, tasks.length) removes every item from the ORIGINAL array in place,
      // then the spread operator (...) unpacks the filtered array into individual items so splice
      // can refill the original array with them. This mutates the same array all files share.
      tasks.splice(0, tasks.length, ...tasks.filter((task) => !task.completed));
      saveTasks();
      renderCompletedTasks();
      totalTaskCalculation();
    });
  }
  function getEditInputInformation() {
  return {
    title: document.querySelector(".edit-title").value,
    description: document.querySelector(".edit-description").value,
    priority: document.querySelector(".edit-priority").value,
    dueDate: document.querySelector(".edit-due-date").value,
    category: document.querySelector(".edit-category").value,
    completed: tasks[currentEditingIndex].completed,
  };
}

document.querySelector(".js-edit-task-modal .js-close-modal").addEventListener("click", () => {
  document.querySelector(".js-edit-task-modal").style.display = "none";
});

document.querySelector(".js-edit-cancel-button").addEventListener("click", () => {
  document.querySelector(".js-edit-task-modal").style.display = "none";
});

document.querySelector(".js-update-button").addEventListener("click", (event) => {
  event.preventDefault();
  const updatedTask = getEditInputInformation();
  if (!updatedTask.title) return alert("Title cannot be empty");
  if (!updatedTask.description) return alert("Description cannot be empty");
  if (!updatedTask.priority) return alert("Priority cannot be empty");
  if (!updatedTask.dueDate) return alert("Due date cannot be empty");
  if (!updatedTask.category) return alert("Category cannot be empty");
  tasks[currentEditingIndex] = updatedTask;
  saveTasks();
  renderCompletedTasks();
  totalTaskCalculation();
  document.querySelector(".js-edit-task-modal").style.display = "none";
});
}
totalTaskCalculation();
renderCompletedTasks();
