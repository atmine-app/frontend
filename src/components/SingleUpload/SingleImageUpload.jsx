import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Dropzone from 'react-dropzone'
import { Container } from 'reactstrap'
import './SingleImageUpload.css'
import PuffLoader from "react-spinners/PuffLoader";
import { RxUpload } from "react-icons/rx";

export default function SingleImageupload({ onImageDataChange }) {
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleDrop = (files) => {
    const file = files[0]
    const formData = new FormData()
    formData.append('file', file)
    formData.append('tags', `codeinfuse, medium, gist`)
    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
    formData.append('api_key', process.env.REACT_APP_CLOUDINARY_API_KEY)
    formData.append('timestamp', (Date.now() / 1000) | 0)
    setLoading(true)
    axios
      .post('https://api.cloudinary.com/v1_1/at-mine/image/upload', formData, {
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
      })
      .then((response) => {
        const data = response.data
        const fileURL = data.secure_url
        setImage(fileURL)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    onImageDataChange(image)
  }, [onImageDataChange, image])

  function removeImage() {
    setImage(null);
  }

  function ImagePreview() {
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
          {image ? (
            <div className="image-container">
              <div className="image-wrapper">
                <img
                  alt="uploaded"
                  src={image}
                />
                <button className="remove-image single-image" onClick={removeImage}>
                  X
                </button>
              </div>
            </div>
          ) : (
            <p>No image uploaded</p>
          )}
        </div>
      )
    }
  }

  return (
    <div>
      <Container>
        <Dropzone className="dropzone" onDrop={handleDrop}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps({ className: 'dropzone' })}>
              <span className="icon"><RxUpload /></span>
                <p>Drag and drop an image or click here to browse.</p>
                <input {...getInputProps()} />
              </div>
            </section>
          )}
        </Dropzone>
        {ImagePreview()}
      </Container>
    </div>
  )
}
