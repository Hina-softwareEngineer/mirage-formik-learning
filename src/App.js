import React, { useState, useEffect } from "react";
import "./App.css";

// import Todos from "./components/Todos";
//import MirageServer from "./mirage/index";

//MirageServer();

function App() {
  let [image, setImage] = useState(null);
  let [getImage, setgetImage] = useState(null);

  useEffect(() => {
    fetch("/apis")
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((e) => console.log("eerror"));
  }, []);

  const saveImage = (e) => {
    console.log(e.target.files[0], e.target.files[0].name);
    setgetImage(e.target.files[0]);
  };

  // const saveImage = (e) => {
  //   console.log(e.target.file, e.target.files[0]);
  //   let selectedImage = e.target.files[0];
  //   createBase64Image(selectedImage);
  // };

  // const createBase64Image = (fileObject) => {
  //   let reader = new FileReader();

  //   reader.onload = (e) => {
  //     setImage(e.target.result);
  //   };

  //   reader.readAsBinaryString(fileObject);
  // };

  const addImage = () => {
    console.log("sending...", getImage);

    const fd = new FormData();
    fd.append("myImage", getImage, getImage.name);
    console.log(fd);

    fetch("http://localhost:4000/upload", {
      method: "POST",
      body: fd,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        console.log(res.json());
      })
      .then((res) => console.log(res))
      .catch((e) => console.log("error"));
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>todo</p>

        <input name="myImage" type="file" onChange={saveImage} />

        <button onClick={addImage}>Add image</button>
      </header>
    </div>
  );
}

export default App;
