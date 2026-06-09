import { totalTaskCalculation } from "./taskcalculation.js";

export const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentEditingIndex = null; // Track which task is being edited

 export function renderPage() {
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
                <button aria-label="Edit task" class="js-edit-button" data-index="${index}">
                  <i class="fa-regular fa-pen-to-square"></i>
                </button>
                <button aria-label="Delete task" class="js-delete-button" data-index="${index}">
                  <i class="fa-regular fa-trash-can"></i>
                </button>
              </div>
            </div>`;
    });
    document.querySelector(".js-task-list").innerHTML = taskHTML;

    document.querySelectorAll(".js-delete-button").forEach((item) => {
      item.addEventListener("click", () => {
        const index = item.dataset.index;
        //This will give us the task object that was clicked on, we can use this to populate the edit form or perform other actions
        const task = tasks[Number(index)];
        //Remove the task from the array
        //The splice method takes two arguments, the first is the index of the item to remove, and the second is the number of items to remove (in this case, we only want to remove one item)
        tasks.splice(Number(index), 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        //Re-render the page to reflect the changes
        renderPage();
        totalTaskCalculation();
      });
    });

    document.querySelectorAll(".js-edit-button").forEach((item) => {
      item.addEventListener("click", () => {
        const index = item.dataset.index;
        currentEditingIndex = Number(index); // Store the index of the task being edited
        // Find the task object with the matching index
        const task = tasks[Number(index)];
        // Populate the edit form with the task's information

        document.querySelector(".edit-title").value = task.title;

        document.querySelector(".edit-description").value = task.description;
        document.querySelector(".edit-priority").value = task.priority;
        document.querySelector(".edit-due-date").value = task.dueDate;
        document.querySelector(".edit-category").value = task.category;
        // Show the edit modal

        document.querySelector(".js-edit-task-modal").style.display = "flex";
      });
    });
  }
  renderTasks();
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
  document.querySelector(".js-new-task-modal").style.display = "none";
});

const cancelButton = document.querySelector(".js-cancel-button");
cancelButton.addEventListener("click", () => {
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
  renderPage();
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
  renderPage();
  totalTaskCalculation();
  document.querySelector(".js-edit-task-modal").style.display = "none";
});
totalTaskCalculation();

renderPage();
