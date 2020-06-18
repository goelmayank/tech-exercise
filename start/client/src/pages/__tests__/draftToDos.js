import React from "react";
import ReactDOM from "react-dom";
import draftToDos from "../draftToDos";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<draftToDos />, div);
});
