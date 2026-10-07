while await fetch(...) is waiting for a response, what is the rest of your program allowed to do?

=> while await fetch(...) is waiting for a response, the rest of the program is allowed to keep responding normally without pausing any other tasks but the current async function.