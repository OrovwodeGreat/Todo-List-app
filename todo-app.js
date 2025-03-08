var ulMain =  document.querySelector("ul");
var button = document.querySelector("#btn");
var enterTodo = document.querySelector("#enterTodo")
var newTodo = [];
var checkbox = document.createElement("input"); // Checkbox
var Delete = document.createElement("span");


// Add Tasks
enterTodo.addEventListener("keypress", function(event) {
    if (event.key === "Enter") { // Check if Enter key is pressed
            addTask();
        }
});

button.addEventListener("click", function() {
    addTask();
});
// Add Tasks


// Mark Tasks as Completed
ulMain.addEventListener("click", function(event) {
    if(event.target.tagName === "INPUT" && event.target.type === "checkbox") {
        event.target.nextElementSibling.classList.toggle("slash");
    }
});
// Mark Tasks as Completed


// Delete Tasks
ulMain.addEventListener("click", function(event) {
    if(event.target.classList.contains("fa-circle-xmark")) {
        event.target.parentElement.parentElement.remove();
    }
});


// Delete Tasks


// FUNCTIONS MESS
function addTask() {
    var input = enterTodo.value;
    if (input === "") return;
    newTodo.push(input);

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
// FUCNTIONS MESS

// 1️⃣ Create an input field and a button

// 2️⃣ Capture user input when they click "Add"

// 3️⃣ Display the tasks dynamically on the page
// 4️⃣ Add a "Mark as Completed" function
// 5️⃣ Add a "Delete Task" function

