import React, { useEffect } from "react";

let baseUrl = "fakeapi";

const Todos = () => {
  useEffect(() => {
    fetch(`/${baseUrl}/getTodos`)
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  const addTodoHandler = () => {
    fetch(`/${baseUrl}/addTodos`, {
      method: "POST",
      body: { id: 1232, text: "text" },
    })
      .then((res) => console.log("success"))
      .catch((e) => console.log(e, "error"));
  };

  const getDataHandler = () => {
    fetch(`/${baseUrl}/getTodos`)
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  return (
    <div>
      Hello from todos
      <button onClick={addTodoHandler}>Add</button>
      <button onClick={getDataHandler}>get</button>
    </div>
  );
};

export default Todos;
