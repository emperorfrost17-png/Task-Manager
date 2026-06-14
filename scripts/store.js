const savedTasks = localStorage.getItem("tasks");
// Initialize the tasks array with saved tasks or an empty array
export const tasks = savedTasks ? JSON.parse(savedTasks) : [];

export function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

export let currentEditingIndex = null;
export function setCurrentEditingIndex(index) {
  currentEditingIndex = index;
}
export function getOverdueDays(dueDate) {
  const today = new Date(); // gets today's date
  const due = new Date(dueDate); // converts the task's due date string into a date
  today.setHours(0, 0, 0, 0); // removes the time so we only compare dates
  due.setHours(0, 0, 0, 0); // same here
  /*
  1000 = 1 second
  1000 * 60 = 1 minute
  1000 * 60 * 60 = 1 hour
  1000 * 60 * 60 * 24 = 1 day
  that is the conversion from milliseconds to days, which is what we need to calculate the difference in days between today and the due date. 
  */
 //When you subtract two date objects, JavaScript automatically converts them into milliseconds behind the scenes:
 //Then dividing by 1000 * 60 * 60 * 24 converts those milliseconds into days:
 // Math.floor rounds down to the nearest whole number.
  const dayDiff = Math.floor((today - due) / (1000 * 60 * 60 * 24)); // converts milliseconds to days
  return dayDiff > 0 ? dayDiff : 0; // if overdue return the days, otherwise return 0
}
