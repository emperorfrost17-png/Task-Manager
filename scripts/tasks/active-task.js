import { tasks, saveTasks } from "../store.js";
import { totalTaskCalculation } from "../taskcalculation.js";

let currentEditingIndex = null;

export function getActiveTasks() {
  return tasks.filter((task) => !task.completed);
}

const activeTaskList = document.querySelector(".js-active-task-list");

export function renderActiveTasks() {
  function renderTasks() {
    let taskHTML = "";
    getActiveTasks().forEach((task) => {
      const actualIndex = tasks.indexOf(task);
      taskHTML += `<div class="task-item" data-index="${actualIndex}">
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
    if (activeTaskList) activeTaskList.innerHTML = taskHTML;
  }
  renderTasks();
}

if (activeTaskList) {
  activeTaskList.addEventListener("click", (e) => {
    const deleteBtn = e.target.closest(".js-delete-button");
    const editBtn = e.target.closest(".js-edit-button");
    const checkBtn = e.target.closest(".js-task-check");
    const uncheckBtn = e.target.closest(".js-task-uncheck");

    if (checkBtn) {
      const index = Number(checkBtn.dataset.index);
      tasks[index].completed = true;
      saveTasks();
      totalTaskCalculation();
      renderActiveTasks();
    }

    if (uncheckBtn) {
      const index = Number(uncheckBtn.dataset.index);
      tasks[index].completed = false;
      saveTasks();
      totalTaskCalculation();
      renderActiveTasks();
    }

    if (deleteBtn) {
      const index = Number(deleteBtn.dataset.index);
      tasks.splice(index, 1);
      saveTasks();
      totalTaskCalculation();
      renderActiveTasks();
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
}

function getInputInformation() {
  return {
    title: document.querySelector(".new-title").value,
    description: document.querySelector(".new-description").value,
    priority: document.querySelector(".new-priority").value,
    dueDate: document.querySelector(".new-due-date").value,
    category: document.querySelector(".new-category").value,
    completed: false,
  };
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

function clearFormInputs() {
  document.querySelector(".new-title").value = "";
  document.querySelector(".new-description").value = "";
  document.querySelector(".new-priority").value = "low";
  document.querySelector(".new-due-date").value = "";
  document.querySelector(".new-category").value = "";
}
function getOverdueDays(dueDate) {
  const currentDate = new Date();
  const due = new Date(dueDate);
  // Set both to midnight to compare just the dates, not the time
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);

  const timeDiff = currentDate - due;
  const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  return dayDiff > 0 ? dayDiff : 0;
}

// --- Modal / button listeners ---

document.querySelector(".js-add-task-button").addEventListener("click", () => {
  document.querySelector(".js-new-task-modal").style.display = "flex";
});

document.querySelector(".js-close-modal").addEventListener("click", () => {
  clearFormInputs();
  document.querySelector(".js-new-task-modal").style.display = "none";
});

document.querySelector(".js-cancel-button").addEventListener("click", () => {
  clearFormInputs();
  document.querySelector(".js-new-task-modal").style.display = "none";
});

document
  .querySelector(".js-edit-task-modal .js-close-modal")
  .addEventListener("click", () => {
    document.querySelector(".js-edit-task-modal").style.display = "none";
  });

document
  .querySelector(".js-edit-cancel-button")
  .addEventListener("click", () => {
    document.querySelector(".js-edit-task-modal").style.display = "none";
  });

const clearCompletedButton = document.querySelector(".js-clear-completed");
if (clearCompletedButton) {
  clearCompletedButton.addEventListener("click", () => {
    tasks.splice(0, tasks.length, ...tasks.filter((task) => !task.completed));
    saveTasks();
    renderActiveTasks();
    totalTaskCalculation();
  });
}

document.querySelector(".js-save-button").addEventListener("click", (event) => {
  event.preventDefault();
  const newTask = getInputInformation();
  if (!newTask.title) return alert("Title cannot be empty");
  if (!newTask.description) return alert("Description cannot be empty");
  if (!newTask.priority) return alert("Priority cannot be empty");
  if (!newTask.dueDate) return alert("Due date cannot be empty");
  if (!newTask.category) return alert("Category cannot be empty");
  tasks.push(newTask);
  saveTasks();
  clearFormInputs();
  renderActiveTasks();
  totalTaskCalculation();
  document.querySelector(".js-new-task-modal").style.display = "none";
});

document
  .querySelector(".js-update-button")
  .addEventListener("click", (event) => {
    event.preventDefault();
    const updatedTask = getEditInputInformation();
    if (!updatedTask.title) return alert("Title cannot be empty");
    if (!updatedTask.description) return alert("Description cannot be empty");
    if (!updatedTask.priority) return alert("Priority cannot be empty");
    if (!updatedTask.dueDate) return alert("Due date cannot be empty");
    if (!updatedTask.category) return alert("Category cannot be empty");
    tasks[currentEditingIndex] = updatedTask;
    saveTasks();
    renderActiveTasks();
    totalTaskCalculation();
    document.querySelector(".js-edit-task-modal").style.display = "none";
  });

totalTaskCalculation();
renderActiveTasks();
