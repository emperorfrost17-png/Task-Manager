const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
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
                <button aria-label="Delete task" class="js-delete-button" data-index="${index}">
                  <i class="fa-regular fa-trash-can"></i>
                </button>
              </div>
            </div>`;
    });
    document.querySelector(".js-task-list").innerHTML = taskHTML;
  }
  renderTasks();

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
    });
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
  };
  return newTask;
}

// This function will clear the form inputs after a new task is added, or when the modal is closed
function clearFormInputs() {
  document.querySelector(".new-title").value = "";
  document.querySelector(".new-description").value = "";
  document.querySelector(".new-priority").value = "";
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

const saveButton = document.querySelector(".js-save-button");
saveButton.addEventListener("click", () => {
  //Get the input information and create a new task object, then push that object to the tasks array, clear the form inputs, and re-render the page to show the new task
  const newTask = getInputInformation();
  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  clearFormInputs();
  renderPage();
  document.querySelector(".js-new-task-modal").style.display = "none";
});

renderPage();
