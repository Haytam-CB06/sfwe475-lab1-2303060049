import { TaskSchema } from "./schemas";

export function createTask(payload: unknown) {
  const result = TaskSchema.safeParse(payload);

  if (!result.success) {
    return { ok: false as const, error: result.error.flatten() };
  }

  return { ok: true as const, task: result.data };
}
