import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import FormData from "./components/FormikForm";
import FileBase from "react-file-base64";

import Todos from "./components/Todos";
import MirageServer from "./mirage/index";

MirageServer();

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>todo</p>

        <Todos />
        <FormData />
      </header>
    </div>
  );
}

export default App;
