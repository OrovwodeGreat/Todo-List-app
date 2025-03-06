var ul =  document.querySelector("ul");
var button = document.querySelector("#btn");
var enterTodo = document.querySelector("#enterTodo")
var newTodo = [];
var checkbox = document.createElement("input"); // Checkbox
// Add Tasks
function addTask() {
    var input = enterTodo.value;
    if (input === "") return;
    newTodo.push(input);

    // Clear the ul element before appending new tasks
    ul.innerHTML = "";

    newTodo.forEach(function(todo) {
        var taskUl = document.createElement("ul"); // Create a new ul for each task
        taskUl.classList.add("ul"); // Apply the .ul class to the new ul

        var li = document.createElement("li"); // List item
        var checkbox = document.createElement("input"); // Checkbox
        var label = document.createElement("span"); // Task text

        // Set attributes
        checkbox.type = "checkbox";
        label.textContent = todo;
        label.className = "task";
        checkbox.classList.add("input-checkbox");

        // Append elements
        li.appendChild(checkbox);
        li.appendChild(label);
        taskUl.appendChild(li);
        ul.appendChild(taskUl);
    });
    enterTodo.value = "";
}   
enterTodo.addEventListener("keypress", function(event) {
    if (event.key === "Enter") { // Check if Enter key is pressed
            addTask();
        }
});

button.addEventListener("click", function() {
    addTask();
});

// Mark Tasks as Completed
ul.addEventListener("click", function(){
    this.classList.toggle("slash")
});
// Delete Tasks



// 1️⃣ Create an input field and a button

// 2️⃣ Capture user input when they click "Add"

// 3️⃣ Display the tasks dynamically on the page
// 4️⃣ Add a "Mark as Completed" function
// 5️⃣ Add a "Delete Task" function

