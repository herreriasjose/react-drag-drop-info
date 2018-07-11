import React from "react";
import { render } from "react-dom";
import Box from "../../src";

const App = () => (
  <Box boxId="1">
    <p>Drop a file here and check the console</p>
  </Box>
);
render(<App />, document.getElementById("root"));
