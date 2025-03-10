var enterTodo = document.querySelector("#enterTodo")
var ulMain =  document.querySelector("ul");
var button = document.querySelector("#btn");
var newTodo = [];
var checkbox = document.createElement("input"); // Checkbox
var Delete = document.createElement("span");


// Add Tasks start
enterTodo.addEventListener("keypress", function(event) {
    if (event.key === "Enter") { // Check if Enter key is pressed
            addTask();
        }
});

button.addEventListener("click", function() { 
    addTask();  // Checks if add button was clicked
});
// Add Tasks end


// Mark Tasks as Completed start
ulMain.addEventListener("click", function(event) {
    if(event.target.tagName === "INPUT" && event.target.type === "checkbox") {
        event.target.nextElementSibling.classList.toggle("slash");
    }
});
// Mark Tasks as Completed end


// Delete Tasks end
ulMain.addEventListener("click", function(event) {
    if(event.target.classList.contains("fa-circle-xmark")) {
        event.target.parentElement.parentElement.remove();
    }
});
// Delete Tasks end


// FUNCTIONS MESS START
function addTask() {
    var input = enterTodo.value;
    if (input === "") {
        return alert("input is empty");  // Check if input is empty
    }; 

    newTodo.push(input); //pushes the input to the newTodo array

    // Clear the ul element before appending new tasks
    ulMain.innerHTML = "";

    newTodo.forEach(function(todo) {
        var taskUl = document.createElement("ul"); // Create a new ul for each task
        taskUl.classList.add("ulStyle"); // Apply the .ul class to the new ul

        var li = document.createElement("li"); // List item
        var checkbox = document.createElement("input"); // Checkbox
        var label = document.createElement("span"); // Task text
       

        // Set attributes
        checkbox.type = "checkbox";
        label.textContent = todo; 
        label.classList.add("todo-span");
        checkbox.classList.add("input-checkbox");

        // Create delete icon
        var deleteIcon = document.createElement("i");
        deleteIcon.classList.add("fa-solid", "fa-circle-xmark", "delete-icon");
        deleteIcon.style.marginLeft = "10px"; // Add margin to the left of the delete icon
        // taskUl.classList.add("flexTodo");

        // Append elements
        li.appendChild(checkbox);
        li.appendChild(label);
        li.appendChild(deleteIcon);
        taskUl.appendChild(li);
        ulMain.appendChild(taskUl);
    });
    enterTodo.value = "";
}   
// FUNCTIONS MESS END

// SAVES TO LOCAL STORAGE START
function saveTasks() {
    localStorage.setItem("todos", JSON.stringify(newTodo));
}

// Load tasks from local storage
function loadTasks() {
    var storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
        newTodo = JSON.parse(storedTodos);
        newTodo.forEach(function(todo) {
            var taskUl = document.createElement("ul"); // Create a new ul for each task
            taskUl.classList.add("ulStyle"); // Apply the .ul class to the new ul

            var li = document.createElement("li"); // List item
            var checkbox = document.createElement("input"); // Checkbox
            var label = document.createElement("span"); // Task text

            // Set attributes
            checkbox.type = "checkbox";
            label.textContent = todo; 
            label.classList.add("todo-span");
            checkbox.classList.add("input-checkbox");

            // Create delete icon
            var deleteIcon = document.createElement("i");
            deleteIcon.classList.add("fa-solid", "fa-circle-xmark", "delete-icon");
            deleteIcon.style.marginLeft = "10px"; // Add margin to the left of the delete icon

            // Append elements
            li.appendChild(checkbox);
            li.appendChild(label);
            li.appendChild(deleteIcon);
            taskUl.appendChild(li);
            ulMain.appendChild(taskUl);
        });
    }
}

// Call loadTasks when the page loads
document.addEventListener("DOMContentLoaded", loadTasks);

// Update saveTasks function call in addTask
function addTask() {
    var input = enterTodo.value;
    if (input === "") {
        return alert("input is empty");  // Check if input is empty
    }; 

    newTodo.push(input); //pushes the input to the newTodo array

    // Clear the ul element before appending new tasks
    ulMain.innerHTML = "";

    newTodo.forEach(function(todo) {
        var taskUl = document.createElement("ul"); // Create a new ul for each task
        taskUl.classList.add("ulStyle"); // Apply the .ul class to the new ul

        var li = document.createElement("li"); // List item
        var checkbox = document.createElement("input"); // Checkbox
        var label = document.createElement("span"); // Task text

        // Set attributes
        checkbox.type = "checkbox";
        label.textContent = todo; 
        label.classList.add("todo-span");
        checkbox.classList.add("input-checkbox");

        // Create delete icon
        var deleteIcon = document.createElement("i");
        deleteIcon.classList.add("fa-solid", "fa-circle-xmark", "delete-icon");
        deleteIcon.style.marginLeft = "10px"; // Add margin to the left of the delete icon

        // Append elements
        li.appendChild(checkbox);
        li.appendChild(label);
        li.appendChild(deleteIcon);
        taskUl.appendChild(li);
        ulMain.appendChild(taskUl);
    });
    enterTodo.value = "";
    saveTasks(); // Save tasks to local storage
}
// Add reset button functionality
var resetButton = document.querySelector("#resetBtn");

resetButton.addEventListener("click", function() {
    alert("Are you sure you want to clear all tasks?");
    newTodo = []; // Clear the newTodo array
    ulMain.innerHTML = ""; // Clear the ul element
    saveTasks(); // Update local storage
});
