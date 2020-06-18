import React from "react";
import ReactDOM from "react-dom";
import ToDos from "../toDos";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ToDos />, div);
});
