import { fetchTodo } from "./api";
import { createTask } from "./createTask";
import { TaskSchema } from "./schemas";

async function main() {
  const todo = await fetchTodo(1);
  console.log("Fetched task:", todo);

  const valid = { id: 1, title: "Read", done: false };
  const missingField = { id: 2, done: true };
  const wrongType = { id: 3, title: "Write", done: "yes" };

  for (const candidate of [valid, missingField, wrongType]) {
    const result = TaskSchema.safeParse(candidate);
    console.log(
      result.success,
      result.success ? "" : result.error.issues,
    );
  }

  const payloads: unknown[] = [
    { id: 4, title: "Review notes", done: false },
    { id: 5, done: false },
    { id: 6, title: "Practice", done: "no" },
  ];

  for (const payload of payloads) {
    const result = createTask(payload);

    if (result.ok) {
      console.log("Created task:", result.task);
    } else {
      console.error("Could not create task:", result.error);
    }
  }
}

main();
