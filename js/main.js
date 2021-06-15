// catching the element
const form = document.getElementById("task_form");
const taskInput = document.getElementById("new_task");
const filter = document.getElementById("task_filter");
const taskList = document.getElementById("tasks");
const clearBtn = document.getElementById("clearBtn");

// Define EventListeners;
form.addEventListener("submit", addTask);
taskList.addEventListener("click", removeTask);
clearBtn.addEventListener("click", () => {
  taskList.innerHTML = "";
  localStorage.clear();
});
filter.addEventListener("keyup", filterTask);
document.addEventListener("DOMContentLoaded", getTask);

//Define Functions;

//add task function
function addTask(e) {
  e.preventDefault();
  if (taskInput.value === "") {
    alert("Please Add a Task");
  } else {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.setAttribute("href", "#");
    link.innerText = "x";
    li.innerText = taskInput.value + " ";
    li.appendChild(link);
    taskList.appendChild(li);
    // local store function call
    storeTaskInLocalStorage(taskInput.value);
    taskInput.value = "";
  }
}

//remove task function
function removeTask(e) {
  if (e.target.hasAttribute("href")) {
    if (confirm("Are you sure?")) {
      const element = e.target.parentElement;
      element.remove();
      removeFromLS(element);
    }
  }
}

// filter function
function filterTask(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll("li").forEach((task) => {
    let item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

//store in local storage
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//
function getTask() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach((task) => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.setAttribute("href", "#");
    link.innerText = "x";
    li.innerText = task + " ";
    li.appendChild(link);
    taskList.appendChild(li);
  });
}

//remove from local store
function removeFromLS(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  const li = taskItem;
  li.removeChild(li.lastChild);
  tasks.forEach((task, index) => {
    if (li.textContent.trim() === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
