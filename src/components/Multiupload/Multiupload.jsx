import axios from "axios";
import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import { Container } from "reactstrap";
import "./Multiupload.css";
import PuffLoader from "react-spinners/PuffLoader";
import { RxUpload } from "react-icons/rx";

export default function Multiupload({ onImageDataChange }) {
  const [Image, setImageState] = useState({ array: [] });
  const [loading, setLoading] = useState(false);

  const handleDrop = (files) => {
    const uploaders = files.map((file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tags", `codeinfuse, medium, gist`);
      formData.append(
        "upload_preset",
        process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
      );
      formData.append("api_key", process.env.REACT_APP_CLOUDINARY_API_KEY);
      formData.append("timestamp", (Date.now() / 1000) | 0);
      setLoading(true);
      return axios
        .post(
          "https://api.cloudinary.com/v1_1/at-mine/image/upload",
          formData,
          {
            headers: { "X-Requested-With": "XMLHttpRequest" },
          }
        )
        .then((response) => {
          const data = response.data;
          const fileURL = data.secure_url;
          let specificArrayObject = Image.array;
          specificArrayObject.push(fileURL);
          setImageState({ array: specificArrayObject });
        });
    });
    axios.all(uploaders).then(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    onImageDataChange(Image);
  }, [onImageDataChange, Image]);

  function ImagePreview() {
    const removeImage = (index) => {
      let specificArrayObject = Image.array;
      specificArrayObject.splice(index, 1);
      setImageState({ array: specificArrayObject });
    };

    if (loading) {
      return (
        <div className="loadingImage">
          <PuffLoader color={"#60c2a4"} />
        </div>
      );
    }
    if (!loading) {
      return (
        <div className="image-preview">
          {Image?.array?.length <= 0 ? (
            <p>No images uploaded</p>
          ) : (
            Image.array.map((item, index) => (
              <div key={index} className="image-container">
                <img alt="uploaded" src={item} />
                <button
                  className="remove-image"
                  onClick={() => removeImage(index)}
                >
                  X
                </button>
              </div>
            ))
          )}
        </div>
      );
    }
  }

  return (
    <div>
      <Container>
        <Dropzone className="dropzone" onDrop={handleDrop}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps({ className: "dropzone" })}>
                <span className="icon">
                  <RxUpload />
                </span>
                <p>Drag and drop your images or click here to browse.</p>
                <input {...getInputProps()} />
              </div>
            </section>
          )}
        </Dropzone>
        {ImagePreview()}
      </Container>
    </div>
  );
}
