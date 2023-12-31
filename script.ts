console.log("TS");
class Task {
    public id: number;
    public completed: boolean;

    constructor(public description: string) {
        this.id = Math.floor(Math.random() * 1000);
        this.description = description;
        this.completed = false;
    }

}
let task1 = new Task("HW");
let task2 = new Task("WW");
let task3 = new Task("WR");
console.log(task1);
console.log(task2);
console.log(task3);


class TaskManager {
    public tasks: Task[];
    constructor() {
        this.tasks = [];
    }
    addTask(description: string) {
        this.tasks.push(new Task(description));
    }
    deleteTask(id: number) {
        let indexToDelete = this.tasks.findIndex((task: Task) => task.id == id);
        this.tasks.splice(indexToDelete, 1);
    }
    updateTaskDescription(id: number, newDescription: string): void {
        let indexToUpdate = this.tasks.findIndex((task: Task) => task.id == id);
        this.tasks[indexToUpdate].description = newDescription;
    }
    completeTask(id: number): void {
        let indexToUpdate = this.tasks.findIndex((task: Task) => task.id == id);
        this.tasks[indexToUpdate].completed = true;
    }

}
let manager = new TaskManager();
manager.addTask("Dishes");
manager.addTask("Home Work");
console.log(manager.tasks);

function showTasksInTable(): void {
    for (let task of manager.tasks) {
        document.getElementById("tasks")!.innerHTML += `<tr><td>${task.id}</td><td>${task.description}</td><td>${task.completed}</td></tr>`
    }
}
function showTasksInLists() {
    document.getElementById("active")!.innerHTML = "";
    document.getElementById("completed")!.innerHTML = "";
    for (let task of manager.tasks) {
        if (task.completed == false) {
            document.getElementById("active")!.innerHTML += `
     <div> <li class="list-group-item d-inline-block w-50">${task.description}</li> <span> <button class="btn btn-success" onclick="completeTask(${task.id})"><i class="fa-solid fa-check"></i></button> <button class="btn btn-primary" onclick="updateDescription(${task.id})"><i class="fa-solid fa-pen"></i></button> <button class="btn btn-danger" onclick="deleteTask(${task.id})"><i class="fa-solid fa-trash"></i></button></span> </div> `;
            localStorage.setItem("user1", JSON.stringify(manager.tasks));
        } else {
            document.getElementById("completed")!.innerHTML += `
      <div> <li class="list-group-item d-inline-block w-50 text-decoration-line-through">${task.description}</li> <span> <button class="btn btn-success" disabled><i class="fa-solid fa-check-double"></i></button> <button class="btn btn-primary" disabled><i class="fa-solid fa-pen"></i></button> <button class="btn btn-danger" disabled><i class="fa-solid fa-trash"></i></button></span> </div> `;
        }
    }
}

showTasksInLists();

function completeTask(id: number) {
    manager.completeTask(id);
    showTasksInLists();
}

function deleteTask(id: number) {
    // confirm "Are you sure?"
    if (confirm("Are you sure?")) {
        manager.deleteTask(id);
        showTasksInLists();
    }
}
function addNewTask() {
    let description = (document.getElementById("description") as HTMLInputElement)
        .value;
    manager.addTask(description);
    (document.getElementById("description") as HTMLInputElement).value = "";
    showTasksInLists();
}
function updateDescription(id: number) {
    // prompt for new description
    let newDescription = prompt("Enter new description:");
    if (newDescription != null || newDescription != "") {
        manager.updateTaskDescription(id, newDescription!);
        showTasksInLists();
    } else alert("Sorry! Something went wrong");
}