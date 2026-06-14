import {tasks, saveTasks, getOverdueDays, setCurrentEditingIndex} from '../store.js';
import {renderAll} from '../main.js';

export function getLowPriorityTasks() {
  return tasks.filter((task) => task.priority.toLowerCase() === "low" && !task.completed);
}
const lowPriorityTaskList = document.querySelector(".js-low-priority-task-list");

export function renderLowPriorityTasks() {
  function renderTasks() {
    let taskHTML = "";
    getLowPriorityTasks().forEach((task) => {
      const overdueDays = getOverdueDays(task.dueDate);
      const dueDateDisplay = overdueDays > 0 ? `<span class="due-date overdue">${overdueDays}d overdue</span>` : `<span class="due-date">${new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>`
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
                  ${dueDateDisplay}
                  ${task.category ? `<span class="task-category">${task.category}</span>` : ""}
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
    if (lowPriorityTaskList) lowPriorityTaskList.innerHTML = taskHTML;
  }
  renderTasks();
}

if (lowPriorityTaskList) {
  lowPriorityTaskList.addEventListener("click", (e) => {
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

