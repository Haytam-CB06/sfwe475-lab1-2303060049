import { addTask, findTask, Task } from "./tasks";

let tasks: Task[] = [];

tasks = addTask(tasks, "Read Chapter 1");
tasks = addTask(tasks, "Finish assignment");

console.log(tasks);

const foundTask = findTask(tasks, 1);

if (foundTask) {
  console.log(foundTask);
} else {
  console.log("Task not found.");
}

const missingTask = findTask(tasks, 99);

if (missingTask) {
  console.log(missingTask);
} else {
  console.log("Task with id 99 was not found.");
}
const result = findTask(tasks, 99);

if (result.ok) {
  console.log(result.task);
} else {
  console.log(result.error);
}