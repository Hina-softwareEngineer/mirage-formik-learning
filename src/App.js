import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import FormData from "./components/FormikForm";
import FileBase from "react-file-base64";

// import Todos from "./components/Todos";
//import MirageServer from "./mirage/index";

//MirageServer();

function App() {
  let [image, setImage] = useState(null);
  let [getImage, setgetImage] = useState(null);
  let [baseImage, setbaseImage] = useState(null);
  let [realImg, setrealImg] = useState(null);

  const [file, setFile] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/apis")
      .then((res) => console.log(res))
      .catch((e) => console.log("eerror"));
  }, []);

  const saveImage = (e) => {
    console.log(e.target.files[0], e.target.files[0].name);
    setFile(e.target.files[0]);
  };

  const updateProgressBarValue = (value) => {
    console.log("value :", value);
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

  const addImage = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("myImage", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post("http://localhost:4000/upload", formData, config)
      .then((response) => {
        console.log("The file is successfully uploaded");
      })
      .catch((e) => console.log("error"));
    console.log("sending...", getImage);

    // const fd = new FormData();
    // fd.append("myImage", getImage);
    // console.log(fd);

    // fetch("http://localhost:4000/upload", {
    //   method: "POST",
    //   body: fd,
    // })
    //   .then((res) => {
    //     console.log(res.json());
    //   })
    //   .then((res) => console.log(res))
    //   .catch((e) => console.log("error"));
  };

  const getBaseFile = (files) => {
    setbaseImage(files.base64.toString());
    // console.log(files.base64.toString());

    // let thumb = new Buffer(files.base64.toString().data).toString("base64");
    // // console.log(thumb);
    // console.log("done");
    // setrealImg(thumb);

    let imageObj = {
      imageName: "base-image-" + Date.now(),
      imageData: files.base64.toString(),
    };

    axios
      .post("http://localhost:4000/uploadbase", imageObj, {
        onUploadProgress: (progressEvent) => {
          if (progressEvent.lengthComputable) {
            console.log(progressEvent.loaded + " " + progressEvent.total);
            updateProgressBarValue(progressEvent);
          }
        },
      })
      .then((response) => {
        console.log("The file is successfully uploaded", response);

        setrealImg(response.data.newImage.imageData);
      })
      .catch((e) => console.log("error"));
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>todo</p>

        <form onSubmit={addImage} encType="multipart/form-data">
          <input name="myImage" type="file" onChange={saveImage} />

          <button type="submit">Add image</button>
        </form>

        <FormData />

        <div>
          <h4>Process Using Base64</h4>
          <FileBase type="file" onDone={getBaseFile} />
        </div>

        <img src={realImg} alt="hello" />
      </header>
    </div>
  );
}

export default App;
