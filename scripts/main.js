import { tasks } from "./task.js";

function renderPage() {
function renderTasks() {
  let taskHTML = "";
  tasks.forEach((task, index) => {
    taskHTML += ` <div class="task-item" data-index="${index}">
              <button class="task-check" aria-label="Mark task as completed">
                <i class="fa-regular fa-circle"></i>
              </button>

              <div class="task-item-content">
                <h3>${task.title}</h3>
                <p class="task-description">${task.description}</p>
                <div class="task-meta">
                  <span class="task-priority-${task.priority.toLowerCase()}">${task.priority}</span>
                  <span class="due-date"
                    ><i class="fa-regular fa-calendar"></i> ${task.dueDate}</span
                  >
                  <span class="task-category">${task.category}</span>
                </div>
              </div>

              <div class="task-actions">
                <button aria-label="Edit task" data-name="${task.title}">
                  <i class="fa-regular fa-pen-to-square"></i>
                </button>
                <button aria-label="Delete task">
                  <i class="fa-regular fa-trash-can"></i>
                </button>
              </div>
            </div>`;
  });
  document.querySelector(".js-task-list").innerHTML = taskHTML;
}

renderTasks();
}
renderPage();

