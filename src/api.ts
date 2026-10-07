import {
  TaskSchema,
  TodoResponseSchema,
  type Task,
} from "./schemas";

export async function fetchTodo(id: number): Promise<Task | null> {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
    );

    if (!response.ok) {
      console.error(`Request failed with status ${response.status}`);
      return null;
    }

    const raw: unknown = await response.json();
    const todoResult = TodoResponseSchema.safeParse(raw);

    if (!todoResult.success) {
      console.error("Invalid API response:", todoResult.error.issues);
      return null;
    }

    const taskResult = TaskSchema.safeParse({
      id: todoResult.data.id,
      title: todoResult.data.title,
      done: todoResult.data.completed,
    });

    if (!taskResult.success) {
      console.error(
        "Could not convert API response to a Task:",
        taskResult.error.issues,
      );
      return null;
    }

    return taskResult.data;
  } catch (error) {
    console.error("Could not fetch the to-do:", error);
    return null;
  }
}
