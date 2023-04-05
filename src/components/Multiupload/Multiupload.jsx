import axios from 'axios'
import React, {useState, useEffect} from 'react'
import Dropzone from 'react-dropzone'
import {Container} from 'reactstrap'
import './Multiupload.css'

export default function Multiupload({onImageDataChange}) {
  const [Image, setImageState] = useState({array: []})
  const [loading, setLoading] = useState(false)

  const handleDrop = (files) => {
    const uploaders = files.map((file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tags", `codeinfuse, medium, gist`);
      formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
      formData.append("api_key", process.env.REACT_APP_CLOUDINARY_API_KEY);
      formData.append("timestamp", (Date.now() / 1000) | 0);
      setLoading(true)
      return axios
        .post("https://api.cloudinary.com/v1_1/at-mine/image/upload", formData, {
          headers: { "X-Requested-With": "XMLHttpRequest" },
        })
        .then((response) => {
          const data = response.data;
          const fileURL = data.secure_url;
          let specificArrayObject = Image.array;
          specificArrayObject.push(fileURL);
          setImageState({array: specificArrayObject});
        })
      })
      axios.all(uploaders).then(() => {
        setLoading(false)  
      })
  };
  

    useEffect(() => {
      onImageDataChange(Image)
      console.log(Image)
    }, [Image])

  function ImagePreview() {
  if(loading) {
    return <h3>Loading...</h3>
  }
  if(!loading) {
    return (
      <div>
        {Image?.array?.length <= 0 ? 
          <p>No images uploaded</p> 
          : Image.array.map((item, index) => (
            // eslint-disable-next-line jsx-a11y/img-redundant-alt
            <img
              key={index}
              alt="uploaded image"
              style={{width: "100px", height: "100px", backgroundSize: "cover", marginRight: "10px"}}
              src={item}
            />
          ))
        }
      </div>
    )
  }
}

  return (
    <div>
      <Container>
        <h1 className="text-center">Upload Your Image</h1>
        <Dropzone 
          className="dropzone"
          onDrop={handleDrop}
          onChange={(e) => setImageState(e.target.value)}
          value={Image}>
          {({getRootProps, getInputProps}) => (
            <section>
              <div {...getRootProps({className: "dropzone"})}>
                <span>Folder Icon</span>
                <p>Drag and drop images</p>
              </div>
            </section>
            )}
        </Dropzone>
        {ImagePreview()}
      </Container>
    </div>
  )
}