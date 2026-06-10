import { tasks } from "../main.js";
import { totalTaskCalculation } from "../taskcalculation.js";
let currentEditingIndex = null;

export function getActiveTasks() {
  return tasks.filter((task) => !task.completed);
}
const activeTaskList = document.querySelector(".js-active-task-list");

function renderActiveTasks() {
  function renderTasks() {
    let taskHTML = "";
    getActiveTasks().forEach((task) => {
      // Use the index of the task in the original tasks array to ensure it matches up with edit and delete buttons
      const actualIndex = tasks.indexOf(task);
      taskHTML += ` <div class="task-item" data-index="${actualIndex}">
              <button class="task-check" aria-label="Mark task as completed">
                <i class="fa-regular fa-circle"></i>
              </button>

              <div class="task-item-content">
                <h3>${task.title}</h3>
                <p class="task-description">${task.description}</p>
                <div class="task-meta">
                  <span class="task-priority-${task.priority.toLowerCase()}">${task.priority}</span>
                  <span class="due-date"
                    ><i class="fa-regular fa-calendar"></i> ${new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span
                  >
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

  document.querySelectorAll(".js-delete-button").forEach((item) => {
    if (item) {
      item.addEventListener("click", () => {
        const index = item.dataset.index;
        tasks.splice(Number(index), 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));

        totalTaskCalculation();
        renderActiveTasks();
      });
    }
  });

  document.querySelectorAll(".js-edit-button").forEach((item) => {
    if (item) {
      item.addEventListener("click", () => {
        const index = item.dataset.index;
        currentEditingIndex = Number(index);
        const task = tasks[Number(index)];
        document.querySelector(".edit-title").value = task.title;
        document.querySelector(".edit-description").value = task.description;
        document.querySelector(".edit-priority").value = task.priority;
        document.querySelector(".edit-due-date").value = task.dueDate;
        document.querySelector(".edit-category").value = task.category;
        document.querySelector(".js-edit-task-modal").style.display = "flex";
      });
    }
  });
}
function getInputInformation() {
  const titleInput = document.querySelector(".new-title");
  const descriptionInput = document.querySelector(".new-description");
  const priorityInput = document.querySelector(".new-priority");
  const dueDateInput = document.querySelector(".new-due-date");
  const categoryInput = document.querySelector(".new-category");
  //Create a new task object with the input values
  const newTask = {
    title: titleInput.value,
    description: descriptionInput.value,
    priority: priorityInput.value,
    dueDate: dueDateInput.value,
    category: categoryInput.value,
    completed: false,
  };
  return newTask;
}
function getEditInputInformation() {
  const titleInput = document.querySelector(".edit-title");
  const descriptionInput = document.querySelector(".edit-description");
  const priorityInput = document.querySelector(".edit-priority");
  const dueDateInput = document.querySelector(".edit-due-date");
  const categoryInput = document.querySelector(".edit-category");
  //Create a new task object with the input values
  const updatedTask = {
    title: titleInput.value,
    description: descriptionInput.value,
    priority: priorityInput.value,
    dueDate: dueDateInput.value,
    category: categoryInput.value,
    // Preserve the completed status of the original task
    completed: tasks[currentEditingIndex].completed,
  };
  return updatedTask;
}
// This function will clear the form inputs after a new task is added, or when the modal is closed
function clearFormInputs() {
  document.querySelector(".new-title").value = "";
  document.querySelector(".new-description").value = "";
  document.querySelector(".new-priority").value = "low";
  document.querySelector(".new-due-date").value = "";
  document.querySelector(".new-category").value = "";
}

// Set up modal event listeners (only run once)
const addButton = document.querySelector(".js-add-task-button");
addButton.addEventListener("click", () => {
  document.querySelector(".js-new-task-modal").style.display = "flex";
});

const closeButton = document.querySelector(".js-close-modal");
closeButton.addEventListener("click", () => {
  clearFormInputs();
  document.querySelector(".js-new-task-modal").style.display = "none";

});

const cancelButton = document.querySelector(".js-cancel-button");
cancelButton.addEventListener("click", () => {
  clearFormInputs();
  document.querySelector(".js-new-task-modal").style.display = "none";
});
const editCloseButton = document.querySelector(
  ".js-edit-task-modal .js-close-modal",
);
editCloseButton.addEventListener("click", () => {
  document.querySelector(".js-edit-task-modal").style.display = "none";
});
const editCancelButton = document.querySelector(".js-edit-cancel-button");
editCancelButton.addEventListener("click", () => {
  document.querySelector(".js-edit-task-modal").style.display = "none";
});

const saveButton = document.querySelector(".js-save-button");
saveButton.addEventListener("click", (event) => {
  event.preventDefault();
  //Get the input information and create a new task object, then push that object to the tasks array, clear the form inputs, and re-render the page to show the new task
  const newTask = getInputInformation();
  if (newTask.title === "") {
    return alert("Title cannot be empty");
  }
  if (newTask.description === "") {
    return alert("Description cannot be empty");
  }
  if (newTask.priority === "") {
    return alert("Priority cannot be empty");
  }
  if (newTask.dueDate === "") {
    return alert("Due date cannot be empty");
  }
  if (newTask.category === "") {
    return alert("Category cannot be empty");
  }
  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  clearFormInputs();
  renderActiveTasks();
  totalTaskCalculation();
  document.querySelector(".js-new-task-modal").style.display = "none";
});
const updateButton = document.querySelector(".js-update-button");
updateButton.addEventListener("click", (event) => {
  event.preventDefault();
  //Get the input information and create a new task object, then push that object to the tasks array, clear the form inputs, and re-render the page to show the new task
  const updatedTask = getEditInputInformation();
  //Validate before saving
  if (updatedTask.title === "") {
    return alert("Title cannot be empty");
  }
  if (updatedTask.description === "") {
    return alert("Description cannot be empty");
  }
  if (updatedTask.priority === "") {
    return alert("Priority cannot be empty");
  }
  if (updatedTask.dueDate === "") {
    return alert("Due date cannot be empty");
  }
  if (updatedTask.category === "") {
    return alert("Category cannot be empty");
  }
  //Use the stored index from when the edit button was clicked
  tasks[currentEditingIndex] = updatedTask;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderActiveTasks();
  totalTaskCalculation();
  document.querySelector(".js-edit-task-modal").style.display = "none";
});

renderActiveTasks();
