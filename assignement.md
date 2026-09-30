# Lab 1: Platform, Git and TypeScript Foundations

**Course:** SFWE475 Advanced Web Programming / Further Topics in Internet Programming, Databases and SQL  
**Faculty:** Faculty of Engineering, Final International University  
**Duration:** 2 hours · Week 1

This lab follows the four strands of the Week 1 lecture. Everyone completes the Core activities; Stretch and Challenge activities are optional.



### Submission details

- **Student name:** [Haytam CHARAFI]
- **Student number:** [2303060049]
- **GitHub repository URL:** "https://github.com/Haytam-CB06/sfwe475-lab1-2303060049 "
- **Open pull request URL:** " https://github.com/Haytam-CB06/sfwe475-lab1-2303060049/pulls "

## Lab schedule

| Time | Strand | Activity |
| --- | --- | --- |
| 0:00–0:10 | Setup | Environment check; pair with a setup buddy if needed |
| 0:10–0:35 | 1 | Web platform and HTTP overview: inspect real HTTP traffic |
| 0:35–0:50 | 2 | Node tooling: initialize a TypeScript project |
| 0:50–1:30 | 3 | TypeScript strict mode: fix strict-mode errors |
| 1:30–1:55 | 4 | Git/GitHub workflow: branch, commit, open a PR |
| 1:55–2:00 | Wrap-up | Submit the PR link and answer the self-check questions |

## Before you start

You need:

- Node.js 20 or higher (LTS)
- Git
- VS Code
- A GitHub account
- A browser with developer tools

Check these before starting the timed activities.

**Suggested pace by experience tier:**

- Beginner: Complete Core carefully and ask for help early.
- Intermediate: Complete Core, then try Stretch.
- Advanced: Move quickly through Core, then try Stretch and Challenge.

## Setup — Core (10 minutes)

1. Open a terminal and check the installed versions:

        node -v
        npm -v
        git --version

   Node must report v20 or higher. If it does not, tell your instructor now; installing Node during the timed activities will cost time needed later.

2. Set your Git identity. This is needed once per machine and identifies who makes each commit:

        git config --global user.name "Your Name"
        git config --global user.email "you@example.com"

3. On GitHub, create a new, empty public repository named **sfwe475-lab1-STUDENTNUMBER**, replacing STUDENTNUMBER with your student number. Do not add a README, .gitignore, or license from the GitHub UI; you will add these in Strand 4.

4. Clone the repository and move into its folder:

        git clone https://github.com/YOUR-USERNAME/sfwe475-lab1-2303060049.git
        cd sfwe475-lab1-2303060049

5. If the Week 1 survey placed you at Beginner, or this is your first time using a terminal, pair with a nearby Advanced-tier student. You must still write and submit your own pull request; pairing is for support, not for one person to do the work.

## Strand 1 — Web platform and HTTP overview (25 minutes)

**Lecture link:** Slides 4–8, “How the web works: three roles” through “Status codes: what happened?”

### Core — everyone completes

1. Open your browser’s developer tools with F12 or right-click and choose Inspect. Select the Network tab and leave it open so it records requests.
2. In a new tab, visit https://jsonplaceholder.typicode.com/todos/1. In the Network tab, select the request row named **1**.
3. In the Headers section, inspect the request and create **notes/http.md** in your project. Fill in:

   | Question | Your answer |
   | --- | --- |
   | Method | [GET] |
   | Status code | [304 Not modified] |
   | Content-Type response header | [text/javascript] |
   | What is in the body? | [{"userId": 1,"id": 1,"title": "delectus aut autem","completed": false}] |

4. Visit https://jsonplaceholder.typicode.com/todos/99999. Record the status code’s family (2xx, 3xx, 4xx, or 5xx) and what that family means. Add one explanatory sentence to **notes/http.md**.
   - **Status code:** [404]
   - **What this status family means:** [it's a client error, more specifically not found ]
5. For that URL, identify and label the scheme (before ://), host (server name), and path (everything after the host). Write them in **notes/http.md**.
   - **Scheme:** [https]
   - **Host:** [jsonplaceholder.typicode.com]
   - **Path:** [/todos/99999]

### Stretch — if you finish Core early

6. Visit https://jsonplaceholder.typicode.com/todos?userId=1. Identify the query string (the part after ?) and explain in one sentence what it filters.
   - *Query string and what it filters:** [userId=1, It filters the users using the userID columns ]
7. In the Network tab, find a POST request on a site you use, such as a search, login, or comment form. Compare its method with the GET requests inspected earlier. Explain what the POST request asks the server to do differently.
   - **POST request example and how it differs from GET:** [POST method tells the user to add data or to store it in a database]

### Challenge — optional

8. Using only the response headers for https://jsonplaceholder.typicode.com/todos/1, decide whether the response looks safe for a browser to cache. Check specifically for a Cache-Control header. Write two sentences in **notes/http.md** justifying your answer using only what the headers say.
   - **Cache-Control header value:** [no-cache]
   - **Caching decision and two-sentence justification:** [ The Cache-Control: no-cache header tells the browser that it must revalidate the cached response before using it again.]

## Strand 2 — Node tooling (15 minutes)

**Lecture link:** Slide 10, “Node.js, npm and package.json”

### Core — everyone completes

1. In the project folder, initialize an npm project, install TypeScript tools, and create a source folder:

        npm init -y
        npm install --save-dev typescript tsx
        mkdir src

   **npm init -y** creates a package.json with default values. The **--save-dev** flag installs TypeScript and tsx as development tools rather than runtime dependencies of a finished app.

2. Create **tsconfig.json** in the project root with this content:

        {
          "compilerOptions": {
            "target": "ES2022",
            "module": "ESNext",
            "moduleResolution": "Bundler",
            "strict": true,
            "noEmit": true,
            "skipLibCheck": true
          },
          "include": ["src"]
        }

3. In **package.json**, replace the scripts section with:

        "scripts": {
          "typecheck": "tsc --noEmit",
          "start": "tsx src/index.ts"
        }

### Stretch — if you finish Core early

4. Look at the version numbers under devDependencies in **package.json** (for example, typescript may be listed as ^5.6.0). In **notes/errors.md**, explain in your own words what ^ means and what each version number (major, minor, patch) represents.
   - **What ^ means:** [llows npm to install newer compatible versions without changing the major version.]
   - **Major version:** [The first number. It usually changes when there are big or breaking changes. In 5.6.0, the major version is 5.]
   

### Challenge — optional

5. Add a third script named **clean** that would delete a build output folder (there is no build output folder yet). You can write the script as if one existed, for example using shell rm -rf or a package such as rimraf. Then explain in one or two sentences why node_modules is excluded from Git even though the project depends on its contents.
   - **clean script added to package.json:** ["clean": "rm -rf dist"]
   - **Why node_modules is excluded from Git:** [Git: node_modules is excluded because it can be recreated at any time by running npm install]

## Strand 3 — TypeScript strict mode (40 minutes)

**Lecture link:** Slides 12–14, “Why TypeScript?” through “Strict mode: your safety net”

### Core — everyone completes

1. Create **src/tasks.ts** and paste this starter code exactly as written. It contains deliberate strict-mode errors to fix in the following steps:

        export type Task = { id: number; title: string; done: boolean; dueDate?: string };
        export function addTask(tasks: Task[], title): Task[] {
          const id = tasks.length + 1;
          return [...tasks, { id, title, done: "false" }];
        }
        export function findTask(tasks: Task[], id: number): Task {
          return tasks.find((t) => t.id === id);
        }
        export function daysUntilDue(task: Task): number {
          const due = new Date(task.dueDate);
          return Math.ceil((due.getTime() - Date.now()) / 86_400_000);
        }

2. Create **src/index.ts**:

        import { addTask, findTask } from "./tasks";
        let tasks = [];
        tasks = addTask(tasks, "Read Chapter 1");
        console.log(findTask(tasks, 1).title);
        console.log(findTask(tasks, 99).title);

3. Run the type checker:

        npm run typecheck

4. Before fixing anything, create **notes/errors.md**. For each error message, write one or two sentences in your own words explaining what TypeScript is objecting to. Understanding the error is the point of this step.
   - **Paste each type checker error and explain it in your own words in notes/errors.md.** Add or remove rows as needed.

     | Error message | What TypeScript is objecting to |
     | --- | --- |
     | [PASTE ERROR 1 HERE] | [YOUR EXPLANATION HERE] |
     | [PASTE ERROR 2 HERE] | [YOUR EXPLANATION HERE] |
     | [PASTE ERROR 3 HERE] | [YOUR EXPLANATION HERE] |
     | [ADD MORE ROWS IF NEEDED] | [YOUR EXPLANATION HERE] |
5. Fix every error so **npm run typecheck** passes with no output. Follow these rules:
   - No **any**: every value must have a specific type.
   - No **!** (non-null assertion): handle the missing case instead of asserting it away.
   - No **// @ts-ignore**: fix the error rather than hiding it.

   Hints, if needed: Add a missing type annotation. The value **"false"** is the wrong type for done; done should be a boolean. Array find can return undefined, so the return type must account for that. dueDate is optional, so handle its absence before using it; daysUntilDue needs the same care.

6. Run the program:

        npm run start

7. The second console.log looks up a task with id 99, which does not exist. Decide how the program should behave instead of crashing, such as printing a clear message, and change the code accordingly.
   - **Chosen behavior for a missing task:** [ Print a clear message saying that the task was not found instead of crashing.]
   - **How you handled it in the code:** [I changed findTask to return a result object with `ok: true` when a task is found and `ok: false` with an error message when it is missing. In index.ts, I check the `ok` value before reading the task.."]

### Stretch — if you finish Core early

8. Add **toggleTask(tasks, id)** to **tasks.ts** to flip a task’s done value. Return a new array instead of modifying the input array.
   - **Implementation note or test example:** [I used map() to create a new array. When the task ID matches, I copy the task and flip its done value using !task.done.]
9. Add **filterTasks(tasks, filter)**, where filter is the union type **"all" | "done" | "open"** (shown on slide 13). Return only the matching tasks.
   - **Implementation note or test example:** [The filter parameter can only be "all", "done", or "open". "done" returns completed tasks, "open" returns incomplete tasks, and "all" returns every task.]

### Challenge — optional

10. Change findTask to return the discriminated union **{ ok: true; task: Task } | { ok: false; error: string }** instead of Task. Update **index.ts** so TypeScript forces you to check ok before reading task.
    - **Implementation note or example of the ok check:** ["I changed findTask so it returns either `{ ok: true, task: Task }` or `{ ok: false, error: string }`. In index.ts, I check `result.ok` before accessing `result.task`, so TypeScript knows which result type I have."]


## Strand 4 — Git/GitHub lab workflow (25 minutes)

**Lecture link:** Slides 16–17, “Git: how your work travels” and “The pull request workflow”

### Core — everyone completes

1. Create **.gitignore** in the project root with this single line:

        node_modules/

2. Create a short **README.md** listing the two commands needed to install and run the project (for example, **npm install** and **npm run start**).
3. Commit the starter directly on main. This is the only commit allowed directly on main; every change after this must be on a branch:

        git add .
        git commit -m "chore: initial project setup"
        git push -u origin main

   - **Initial commit created and pushed:** [YES — I created the initial project setup commit on main and pushed it to GitHub.]

4. Create a branch for the rest of your work:

        git switch -c fix/strict-mode-errors

5. On this branch, make at least three separate commits while completing Strands 1–3. Use messages that describe what changed and why. Examples:
   - fix: type the title parameter in addTask
   - fix: handle missing task in findTask
   - docs: add HTTP inspection notes
6. Push your branch to GitHub:

        git push -u origin fix/strict-mode-errors

7. On GitHub, open a Pull Request from your branch into main. Paste this checklist into the PR description and tick each box that applies:

   - [ x ] npm run typecheck passes
   - [ x ] npm run start runs without crashing
   - [ x ] No any, !, or @ts-ignore
   - [ x ] notes/http.md and notes/errors.md included
   - [ x ] Commit messages are meaningful
   - **Open pull request URL:** "https://github.com/Haytam-CB06/sfwe475-lab1-2303060049/pull/2 "

8. Do not merge the pull request yet. The open PR link is your lab submission.

### Stretch — if you finish Core early





## Wrap-up (5 minutes)

### Submission

Submit the URL of your pull request on the course platform. Do not merge it first; the reviewer needs to see it open.

### Self-check

Answer each question in **notes/reflection.md** in two to three sentences. These questions map back to the three strands you worked through most:

1. What is the difference between a 404 and a 500? (Strand 1)

   [A 404 means the server could not find the requested page or resource. A 500 means the server encountered an internal error while processing the request.]

2. Why does TypeScript strict mode reject tasks.find(...) as a Task return type? (Strand 3)

   [The `find()` method can return either a `Task` or `undefined` if no matching item is found. Strict mode does not allow the code to assume that a Task will always exist, so the missing case must be handled.]

3. Why do we work on a branch instead of committing to main? (Strand 4)

   [A branch lets us make and test changes without directly affecting the stable main branch. It also makes it possible to review the work in a pull request before merging it into main.]
