| Error message | What TypeScript is objecting to |
| --- | --- |
| `TS2307: Cannot find module './tasks' or its corresponding type declarations.` | TypeScript cannot find a file called `tasks.ts` that matches the import in `index.ts`. The file is currently named `task.ts`, so the filename and import do not match. |
| `TS7034: Variable 'tasks' implicitly has type 'any[]' in some locations where its type cannot be determined.` | The empty array `[]` does not give TypeScript enough information to know what type of values should be stored in `tasks`. The array needs an explicit type such as `Task[]`. |
| `TS7005: Variable 'tasks' implicitly has an 'any[]' type.` | Because `tasks` was created without a type, TypeScript treats it as an unsafe `any[]`. It should be declared as an array of `Task` objects. |
| `TS7006: Parameter 'title' implicitly has an 'any' type.` | The `title` parameter does not have a declared type. Since task titles are text, it should be typed as `string`. |
| `TS2322: Type 'Task \| { id: number; title: any; done: string; }' is not assignable to type 'Task'.` | The new task does not fully match the `Task` type. In particular, `title` has no proper type and `done` is being stored as a string instead of a boolean. |
| `TS2322: Type 'string' is not assignable to type 'boolean'.` | The `done` property is declared as a boolean, but the code uses `"false"`, which is a string. It should use the boolean value `false`. |
| `TS2322: Type 'Task \| undefined' is not assignable to type 'Task'.` | `Array.find()` can return `undefined` when no matching task exists. The function return type must therefore allow `undefined`. |
| `TS2769: No overload matches this call.` | `dueDate` is optional, so it may be `undefined`. `new Date()` cannot safely receive `undefined`, so the code must check that `dueDate` exists before creating the date. |
