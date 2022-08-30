import React, { createContext, useCallback, useReducer } from "react";
import { Todo } from "./model";

type editPayload = {
  event: React.FormEvent<HTMLFormElement>;
  editTodo: string;
  id: number;
};

type addPayload = {
  event: React.FormEvent;
  todo: string;
};

type ADD = {
  type: "add";
  payload: addPayload;
};

type REMOVE = {
  type: "remove";
  payload: number;
};
type DONE = { type: "done"; payload: number };

type EDIT = { type: "edit"; payload: editPayload };
type Actions = ADD | REMOVE | DONE | EDIT;
//   | { type: "edit"; payload: editModel };

type todoContextType = {
  add: (payload: addPayload) => void;
  remove: (payload: number) => void;
  done: (payload: number) => void;
  editText: (payload: editPayload) => void;
  state: Todo[];
};

const reducer = (state: Todo[], action: Actions) => {
  console.log("hey");
  switch (action.type) {
    case "add":
      const { todo } = action.payload;
      return [...state, { id: Date.now(), todo, isDone: false }];
    case "remove":
      return state.filter((todo) => todo.id !== action.payload);
    case "done":
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, isDone: true } : todo
      );
    case "edit":
      const { editTodo, id } = action.payload;
      return state.map((todo) =>
        todo.id === id ? { ...todo, todo: editTodo } : todo
      );

    default:
      return state;
  }
};

export const ListContext = createContext<todoContextType>({
  add: () => {},
  remove: () => {},
  done: () => {},
  editText: () => {},
  state: [],
});

type Props = {
  children: JSX.Element;
};

export const ListContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  const add = useCallback(
    (payload: addPayload) => {
      console.log("kjhdkn");
      dispatch({ type: "add", payload });
    },
    [dispatch]
  );

  const remove = useCallback(
    (payload: number) => {
      dispatch({ type: "remove", payload });
    },
    [dispatch]
  );

  const done = useCallback(
    (payload: number) => {
      dispatch({ type: "done", payload });
    },
    [dispatch]
  );

  const editText = useCallback(
    (payload: editPayload) => {
      dispatch({ type: "edit", payload });
    },
    [dispatch]
  );

  return (
    <ListContext.Provider value={{ state, add, remove, done, editText }}>
      {children}
    </ListContext.Provider>
  );
};

export default ListContext;
