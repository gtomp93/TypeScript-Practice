import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { Todo } from "./model";

let name: string;
let age: number | string;
let isStudent: boolean;
let hobbies: string[];
let role: [number, string]; //tuple

// type Person = {
//   name: string;
//   age?: number;
// };

// let person: Person = {
//   name: "graham",
//   age: 29,
// };

// type X =  {
//   a: string;
//   b: number;
// };
// interface Person extends X {
//   name: string;
//   age?: number;
// }
// let lotsOfPeople: Person[];
// interface Guy extends Person {
//   profession: string;
// }

// let printName: (name: string) => void;

// const first = (second: string) => {
//   console.log(name);
// };

// let personName: unknown;

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  console.log(todos);
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }]);
      setTodo("");
    }
  };

  return (
    <div className="App">
      <span className="heading">Taskify</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList todos={todos} setTodos={setTodos} />
      {/* <To */}
    </div>
  );
};

export default App;
