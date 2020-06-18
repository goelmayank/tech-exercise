import React from "react";
import ReactDOM from "react-dom";
import DraftToDos from "../draftToDos";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<DraftToDos />, div);
});
