var lightMode = localStorage.getItem("lightmode");
var toggleBtn= document.querySelector("#toggle");

// Function to enable light mode
function enableLightMode() {
    
    document.body.classList.add("lightmode");
    localStorage.setItem("lightmode","active");
}

if (lightMode === "active") {
    enableLightMode();
}

// Function to disable light mode
function disableLightMode() {
    document.body.classList.remove("lightmode");
    localStorage.setItem("lightmode", null);
}

toggleBtn.addEventListener("click", () =>{
    // document.body.classList.toggle("lightmode");
    lightMode = localStorage.getItem("lightmode");
    // Toggle light mode based on the current state
    lightMode !== "active" ? enableLightMode() : disableLightMode();
})




// Select DOM elements
var enterTodo = document.querySelector("#enterTodo");
var ulMain = document.querySelector("ul");
var addButton = document.querySelector("#btn");
var resetButton = document.querySelector("#resetBtn");

var todos = [];

// Load tasks from local storage, fix old tasks, clean empty ones, and render
function loadTasks() {
  var storedTodos = localStorage.getItem("todos");
  todos = storedTodos ? JSON.parse(storedTodos) : [];

  // ✅ Add missing IDs
  todos = todos.map(function (todo) {
    if (!todo.id) {
      todo.id = Date.now() + Math.floor(Math.random() * 1000);
    }
    return todo;
  });

  // ✅ Remove tasks with empty text
  todos = todos.filter(function (todo) {
    return todo.text && todo.text.trim() !== "";
  });

  saveTasks(); // Save back the cleaned version
  renderTasks();
}

// Save tasks to local storage, always cleaning out any accidental empties
function saveTasks() {
  todos = todos.filter(function (todo) {
    return todo.text && todo.text.trim() !== "";
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Render tasks to the DOM
function renderTasks() {
  ulMain.innerHTML = "";
  todos.forEach(function (todo) {
    var taskUl = document.createElement("ul");
    taskUl.classList.add("ulStyle");

    var li = document.createElement("li");

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.classList.add("input-checkbox");
    checkbox.setAttribute("data-id", todo.id);
    // Add .slash class if todo is completed
    if (todo.completed) {
      li.classList.add("slash");
    }

    var label = document.createElement("span");
    label.textContent = todo.text;
    label.classList.add("todo-span");
    
    var prioritySpan = document.createElement("span");
    prioritySpan.classList.add("priority-align");
    if (todo.priority === "high") {
        prioritySpan.textContent = "🔴";
    }
    else if (todo.priority === "medium") {
        prioritySpan.textContent = "🟠";
    }
    else if (todo.priority === "low") {
        prioritySpan.textContent = "🟢";
    }
   

    var deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid", "fa-circle-xmark", "delete-icon");
    deleteIcon.style.marginLeft = "10px";
    deleteIcon.setAttribute("data-id", todo.id);



    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(prioritySpan);
    li.appendChild(deleteIcon);
    taskUl.appendChild(li);
    ulMain.appendChild(taskUl);
  });
}

// Add a new task
function addTask() {
  var input = enterTodo.value.trim();
  if (!input) {
    alert("Input is empty");
    return;
  }
  // Get the priority value from the priority input (assume it has id="priority")
  var priorityInput = document.querySelector("#priority");
  var priorityValue = priorityInput ? priorityInput.value : "low";
  todos.push({
    id: Date.now(), // ✅ unique ID
    text: input,
    completed: false,
    priority: priorityValue
  });
  renderTasks();
  saveTasks();
  enterTodo.value = "";
}

// Event: Add task on Enter key
enterTodo.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

// Event: Add task on button click
addButton.addEventListener("click", addTask);

// Event: Mark task as completed or delete task
ulMain.addEventListener("click", function (event) {
  // Complete task
  if (event.target.tagName === "INPUT" && event.target.type === "checkbox") {
    var id = Number(event.target.getAttribute("data-id"));
    todos = todos.map(function (todo) {
      return todo.id === id
        ? Object.assign({}, todo, { completed: event.target.checked })
        : todo;
    });
    renderTasks();
    saveTasks();
  }

  // Delete task
  if (event.target.classList.contains("fa-circle-xmark")) {
    var id = Number(event.target.getAttribute("data-id"));
    todos = todos.filter(function (todo) {
      return todo.id !== id;
    });
    renderTasks();
    saveTasks();
  }
});

// Event: Reset all tasks
resetButton.addEventListener("click", function () {
  if (confirm("Are you sure you want to clear all tasks?")) {
    todos = [];
    renderTasks();
    saveTasks();
  }
});

// Load tasks on page load
document.addEventListener("DOMContentLoaded", loadTasks);
 