export type Task = {
  id: number;
  title: string;
  done: boolean;
  dueDate?: string;
};

export function addTask(tasks: Task[], title: string): Task[] {
  const id = tasks.length + 1;

  return [...tasks, { id, title, done: false }];
}

export function daysUntilDue(task: Task): number | undefined {
  if (task.dueDate === undefined) {
    return undefined;
  }

  const due = new Date(task.dueDate);
  const today = new Date();

  const difference = due.getTime() - today.getTime();

  return Math.ceil(difference / (1000 * 60 * 60 * 24));
}
export function toggleTask(tasks: Task[], id: number): Task[] {
  return tasks.map((task) =>
    task.id === id
      ? { ...task, done: !task.done }
      : task
  );
}
export type TaskFilter = "all" | "done" | "open";

export function filterTasks(
  tasks: Task[],
  filter: TaskFilter
): Task[] {
  if (filter === "done") {
    return tasks.filter((task) => task.done);
  }

  if (filter === "open") {
    return tasks.filter((task) => !task.done);
  }

  return tasks;
}
export type FindTaskResult =
  | { ok: true; task: Task }
  | { ok: false; error: string };

export function findTask(tasks: Task[], id: number): FindTaskResult {
  const task = tasks.find((t) => t.id === id);

  if (task === undefined) {
    return {
      ok: false,
      error: `Task with id ${id} was not found.`,
    };
  }

  return {
    ok: true,
    task,
  };
}