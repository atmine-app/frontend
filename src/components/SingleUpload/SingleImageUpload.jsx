import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Dropzone from 'react-dropzone'
import { Container } from 'reactstrap'
import './SingleImageUpload.css'

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

  function ImagePreview() {
    if (loading) {
      return <h3>Loading...</h3>
    }
    if (!loading) {
      return (
        <div>
          {image ? (
            // eslint-disable-next-line jsx-a11y/img-redundant-alt
            <img
              alt="uploaded image"
              style={{ width: '100px', height: '100px', backgroundSize: 'cover', marginRight: '10px' }}
              src={image}
            />
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
                <span>📁</span>
                <p>Drag and drop an image</p>
              </div>
            </section>
          )}
        </Dropzone>
        {ImagePreview()}
      </Container>
    </div>
  )
}