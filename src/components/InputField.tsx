import React, { useContext, useRef } from "react";
import ListContext from "../ListContext";
import "./styles.css";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({ todo, setTodo }) => {
  const { add } = useContext(ListContext);

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      placeholder="Enter a task"
      className="input"
      onSubmit={(e) => {
        e.preventDefault();
        console.log("ola");
        add({ event: e, todo });
        inputRef.current?.blur();
      }}
    >
      <input
        ref={inputRef}
        type="input"
        placeholder="Enter a task"
        className="input__box"
        onChange={(e) => setTodo(e.target.value)}
      />
      <button className="input_submit" type="submit">
        Go
      </button>
    </form>
  );
};

export default InputField;

// const InputField: React.FC<props> = ({todo,setTodo}) =>{

//}

//const InputField = ({ todo, setTodo }: Props) => {
