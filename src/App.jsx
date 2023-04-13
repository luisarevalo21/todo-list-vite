import { useEffect, useState } from "react";
import "./styles.css";
import { NewTodoForm } from "./newTodoForm";
import { TodoList } from "./TodoList";

export default function App() {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue === null) return [];

    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  function addTodo(title) {
    //using the current values requires a function
    setTodos(currentTodos => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false },
      ];
    });
  }

  function toggleTodo(id, completed) {
    console.log("toggle todo triggere");
    console.log("id", id, completed);
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        console.log(todo);
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id);
    });
  }

  return (
    <>
      <NewTodoForm addTodo={addTodo} />

      <TodoList todos={todos} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />
    </>
  );
}
