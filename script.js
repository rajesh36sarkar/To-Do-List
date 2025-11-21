// -------------------------------
//  ELEMENT REFERENCES
// -------------------------------
const input = document.getElementById("input");
const addBtn = document.getElementById("addBtn");
const viewList = document.getElementById("viewList");
const themeToggle = document.getElementById("themeToggle");

// Load saved tasks on page load
document.addEventListener("DOMContentLoaded", loadTasks);

// -------------------------------
//  ADD TASK EVENT
// -------------------------------
addBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (text === "") return;

  addTodoItem(text);
  saveTasks();
  input.value = "";
});

// -------------------------------
//  FUNCTION: Add New Task
// -------------------------------
function addTodoItem(text, completed = false) {
  const li = document.createElement("li");

  const todoText = document.createElement("span");
  todoText.textContent = text;
  if (completed) li.classList.add("completed");

  // COMPLETE ON CLICK
  todoText.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  // Edit button
  const editBtn = document.createElement("button");
  editBtn.className = "iconBtn editBtn material-icons";
  editBtn.textContent = "edit";

  editBtn.addEventListener("click", () => {
    const newText = prompt("Edit task:", todoText.textContent);
    if (newText && newText.trim()) {
      todoText.textContent = newText.trim();
      saveTasks();
    }
  });

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "iconBtn deleteBtn material-icons";
  deleteBtn.textContent = "delete";

  deleteBtn.addEventListener("click", () => {
    li.remove();
    saveTasks();
  });

  li.appendChild(todoText);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);

  viewList.appendChild(li);
}

// -------------------------------
//  SAVE TASKS TO LOCAL STORAGE
// -------------------------------
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#viewList li").forEach(li => {
    tasks.push({
      text: li.querySelector("span").textContent,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("todoList", JSON.stringify(tasks));
}

// -------------------------------
//  LOAD TASKS FROM LOCAL STORAGE
// -------------------------------
function loadTasks() {
  const data = JSON.parse(localStorage.getItem("todoList")) || [];
  data.forEach(task => {
    addTodoItem(task.text, task.completed);
  });
}

// -------------------------------
//  THEME SWITCHER
// -------------------------------
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  // Save mode
  const mode = document.body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", mode);
});

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}
