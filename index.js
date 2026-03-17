const args = process.argv.slice(2);

const command = args[0];
const input = args[1];
const description = args[2];

console.log("Command:", command);
console.log("Input:", input);

const fs = require("fs");

if(!fs.existsSync("tasks.json")) {
    fs.writeFileSync("tasks.json", "[]");
}

function readTasks(){
    const data = fs.readFileSync("tasks.json");
    return JSON.parse(data);
}

function addTask(description){
    const tasks = readTasks();

    const newTask = {
        id: tasks.length + 1,
        description: description,
        status: "todo",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    tasks.push(newTask);

    fs.writeFileSync("tasks.json", JSON.stringify(tasks,null,2));
    console.log(`Task added successfully (ID: ${newTask.id})`);
}

function listTasks(status) {
    const tasks = readTasks();

    if(!status){
        console.log(tasks);
        return;
    }

    const filteredTasks = tasks.filter(task => task.status === status);
    console.log(filteredTasks)
}

function deleteTask(id){
    const tasks = readTasks();
    const filteredTasks = tasks.filter(task => task.id !== Number(id));
    if (tasks.length === filteredTasks.length){
        console.log("Task not found");
        return;
    }
    fs.writeFileSync("tasks.json", JSON.stringify(filteredTasks,null,2));
    console.log("Task deleted successfully");
}

function updateTask(id, description){
    const tasks = readTasks();
    const task = tasks.find(t => t.id === Number(id));
    if(!task){
        console.log("Task not found");
        return;
    }
    task.description = description;
    task.updatedAt = new Date().toISOString();

    fs.writeFileSync("tasks.json",JSON.stringify(tasks,null,2));

    console.log("Task updated successfully");
}

function changeStatus(id, status) {
    const tasks = readTasks();
    const task = tasks.find(t => t.id === Number(id));

    if (!task) {
        console.log("Task not found");
        return;
    }

    task.status = status;
    task.updatedAt = new Date().toISOString();

    fs.writeFileSync("tasks.json", JSON.stringify(tasks, null, 2));

    console.log(`Task marked as ${status}`);
}

if(command === "list"){
    listTasks(args[1]);
}

if(command === "add"){
    addTask(input);
}

if(command === "delete"){
    deleteTask(input);
}

if (command === "update"){
    updateTask(input,description);
}

if (command === "mark-in-progress"){
    changeStatus(input, "in-progress");
}

if (command === "mark-done"){
    changeStatus(input,"done")
}

