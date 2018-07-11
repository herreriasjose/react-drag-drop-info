import React from "react";
import ReactDOM from "react-dom";
import Box from "./Box";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Box />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("obtains a sha-256 from an ArrayBuffer", () => {
  const box = new Box({ handleDrop: null, boxId: "1" });
  expect(box.handleArrayBuffer("Hello World!")).toBe(
    "7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069"
  );
});
