import {
  totalTaskCalculation,
  calculateOverallProgress,
  calculateOverallProgressBar,
} from "./taskcalculation.js";
import {
  tasks,
  saveTasks,
  currentEditingIndex,
  setCurrentEditingIndex,
  getOverdueDays,
} from "./store.js";
import { renderCompletedTasks } from "./tasks/completed-task.js";
import { renderActiveTasks } from "./tasks/active-task.js";
import { renderOverdueTasks } from "./tasks/overdue-task.js";
import { renderLowPriorityTasks } from "./priorities/low-priority.js";
import { renderMediumPriorityTasks } from "./priorities/medium-priority.js";
import { renderHighPriorityTasks } from "./priorities/high-priority.js";

const taskList = document.querySelector(".js-task-list");

export function renderPage() {
  function renderTasks() {
    let taskHTML = "";
    tasks.forEach((task, index) => {
      const overDuedays = getOverdueDays(task.dueDate);
      const dueDateDisplay =
        overDuedays > 0
          ? `<span class="due-date overdue">${overDuedays}d overdue</span>`
          : `<span class="due-date">${new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>`;
      taskHTML += `<div class="task-item" data-index="${index}" style="opacity: ${task.completed ? "0.5" : "1"}; animation-delay: ${index * 0.05}s">
              <button class="task-check js-task-check" aria-label="Mark task as completed" data-index="${index}" style="display: ${task.completed ? "none" : "inline"}">
                <i class="fa-regular fa-circle"></i>
              </button>
              <button class="task-check js-task-uncheck" aria-label="Mark task as not completed" data-index="${index}" style="display: ${task.completed ? "inline" : "none"}">
                <i class="fa-solid fa-circle-check" style="color: rgb(99, 230, 99);"></i>
              </button>
              <div class="task-item-content">
                <h3 style="text-decoration: ${task.completed ? "line-through" : "none"}; opacity: ${task.completed ? "0.5" : "1"}">${task.title}</h3>
                <p class="task-description">${task.description}</p>
                <div class="task-meta">
                  <span class="task-priority-${task.priority.toLowerCase()}">${task.priority}</span>
                  ${dueDateDisplay}
                  ${task.category ? `<span class="task-category">${task.category}</span>` : ""}
                </div>
              </div>
              <div class="task-actions">
                <button aria-label="Edit task" class="js-edit-button" data-index="${index}">
                  <i class="fa-regular fa-pen-to-square"></i>
                </button>
                <button aria-label="Delete task" class="js-delete-button" data-index="${index}">
                  <i class="fa-regular fa-trash-can"></i>
                </button>
              </div>
            </div>`;
    });
    if (taskList) taskList.innerHTML = taskHTML;
  }
  renderTasks();
}

if (taskList) {
  taskList.addEventListener("click", (e) => {
    const deleteBtn = e.target.closest(".js-delete-button");
    const editBtn = e.target.closest(".js-edit-button");
    const checkBtn = e.target.closest(".js-task-check");
    const uncheckBtn = e.target.closest(".js-task-uncheck");

    if (checkBtn) {
      const index = Number(checkBtn.dataset.index);
      tasks[index].completed = true;
      saveTasks();
      renderAll();
    }

    if (uncheckBtn) {
      const index = Number(uncheckBtn.dataset.index);
      tasks[index].completed = false;
      saveTasks();
      renderAll();
    }

    if (deleteBtn) {
      const index = Number(deleteBtn.dataset.index);
      tasks.splice(index, 1);
      saveTasks();
      renderAll();
    }

    if (editBtn) {
      const index = Number(editBtn.dataset.index);
      setCurrentEditingIndex(index);
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
    //saves the exact time the task was created as a number, so you can sort by it later.
    createdAt: Date.now(),
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

// --- Modal / button listeners ---
const addTaskButton = document.querySelector(".js-add-task-button");
if (addTaskButton) {
  addTaskButton.addEventListener("click", () => {
    document.querySelector(".js-new-task-modal").style.display = "flex";
  });
}

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
    // This line removes all completed tasks from the tasks array while keeping the uncompleted ones. It uses the filter method to create a new array that only includes tasks where task.completed is false, and then it uses splice to replace the contents of the original tasks array with this new filtered array.
    tasks.splice(0, tasks.length, ...tasks.filter((task) => !task.completed));
    saveTasks();
    renderAll();
  });
}

document.querySelector(".js-save-button").addEventListener("click", (event) => {
  event.preventDefault();
  const newTask = getInputInformation();
  if (!newTask.title) return alert("Title cannot be empty");
  if (!newTask.description) return alert("Description cannot be empty");
  if (!newTask.priority) return alert("Priority cannot be empty");
  if (!newTask.dueDate) return alert("Due date cannot be empty");

  tasks.unshift(newTask);
  saveTasks();
  clearFormInputs();
  renderAll();
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

    // Update the task in the tasks array
    tasks[currentEditingIndex] = updatedTask;
    saveTasks();
    renderAll();
    document.querySelector(".js-edit-task-modal").style.display = "none";
  });
const atozButton = document.querySelector(".js-sort-by-alphabet");
if (atozButton) {
  atozButton.addEventListener("click", () => {
    //localeCompare is a JavaScript string method that compares two strings in a locale-sensitive way
    tasks.sort((a, b) => a.title.localeCompare(b.title));
    renderAll();
    atozButton.classList.add("active-sort-by-alphabet");
    priorityButton.classList.remove("active-sort-by-priority");
    dueDateButton.classList.remove("active-sort-by-due-date");
    dateCreatedButton.classList.remove("date-created-button");
    dateCreatedButton.classList.remove("active-sort-by-date-created");
  });
}

const priorityButton = document.querySelector(".js-sort-by-priority");
if (priorityButton) {
  priorityButton.addEventListener("click", () => {
    // sort() rules:
    // - negative result → a comes first
    // - positive result → b comes first

    // a - b = small numbers win → come first

    // Priority values:
    // high = 1, medium = 2, low = 3

    // Example:
    // high(1) - medium(2) = -1 → negative → high comes first
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    tasks.sort(
      (a, b) =>
        priorityOrder[a.priority.toLowerCase()] -
        priorityOrder[b.priority.toLowerCase()],
    );
    renderAll();
    atozButton.classList.remove("active-sort-by-alphabet");
    priorityButton.classList.add("active-sort-by-priority");
    dueDateButton.classList.remove("active-sort-by-due-date");
    dateCreatedButton.classList.remove("date-created-button");
    dateCreatedButton.classList.remove("active-sort-by-date-created");
  });
}
const dueDateButton = document.querySelector(".js-sort-by-due-date");
if (dueDateButton) {
  dueDateButton.addEventListener("click", () => {
    tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    renderAll();
    atozButton.classList.remove("active-sort-by-alphabet");
    priorityButton.classList.remove("active-sort-by-priority");
    dueDateButton.classList.add("active-sort-by-due-date");
    dateCreatedButton.classList.remove("date-created-button");
    dateCreatedButton.classList.remove("active-sort-by-date-created");
  });
}
const dateCreatedButton = document.querySelector(".js-sort-by-date-created");
if (dateCreatedButton) {
  dateCreatedButton.addEventListener("click", () => {
    tasks.sort((a, b) => b.createdAt - a.createdAt);
    renderAll();
    atozButton.classList.remove("active-sort-by-alphabet");
    priorityButton.classList.remove("active-sort-by-priority");
    dueDateButton.classList.remove("active-sort-by-due-date");
    dateCreatedButton.classList.add("active-sort-by-date-created");
  });
}

export function renderAll() {
  totalTaskCalculation();
  // Used to calculate the overall progress based on the number of completed tasks and the total number of tasks. It updates the progress bar and percentage display accordingly.
  calculateOverallProgress(tasks.filter((task) => task.completed).length);
  calculateOverallProgressBar(tasks.filter((task) => task.completed).length);
  renderPage();
  renderCompletedTasks();
  renderActiveTasks();
  renderOverdueTasks();
  renderLowPriorityTasks();
  renderMediumPriorityTasks();
  renderHighPriorityTasks();
}
if (dateCreatedButton) {
  dateCreatedButton.classList.add("active-sort-by-date-created");
}
renderAll();