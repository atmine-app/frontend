import React, { useState } from "react";
import propertyService from "../../services/propertyService";
import { useNavigate } from "react-router-dom";
import Multiupload from "../Multiupload/Multiupload";
import "./RegisterPropertyForm.css";


const RegisterPropertyForm = ({onFormDataChange, coordinates}) => {
  const [images, setImages] = useState({array: []})
  const initialState = {
    title: "",
    description:
      "",
    category: "",
    price: "",
    size: "",
    address: "",
    city: "",
    country: "",
    zipCode: "",
  };

  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();

  const handleFormImageChange = (updatedImageArray) => {
    setImages(updatedImageArray.array);
    console.log(updatedImageArray.array)
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(updatedFormData);
    onFormDataChange(updatedFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const propertyData = {
        ...formData,
        coordinates,
        images, 
      };
      console.log(propertyData)
      const createdProperty = await propertyService.addProperty(propertyData);
      navigate(`/properties/${createdProperty._id}`);
      setFormData(initialState);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label>Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label>Category:</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select a category</option>
          <option value="parking">Parking</option>
          <option value="storage">Storage</option>
          <option value="garden">Garden</option>
          <option value="garage">Garage</option>
          <option value="basement">Basement</option>
          <option value="attic">Attic</option>
          <option value="photostudio">Photostudio</option>
          <option value="other">Other</option>
        </select>

        <label>Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <label>Size:</label>
        <input
          type="number"
          id="size"
          name="size"
          value={formData.size}
          onChange={handleChange}
          required
        />

        <label>Images:</label>
        <Multiupload onImageDataChange={handleFormImageChange} />

        <label>Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <label>City:</label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />

        <label>Country:</label>
        <input
          type="text"
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
        />
        <label>Zip Code:</label>
        <input
          type="text"
          id="zipCode"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          required
        />

        <button type="submit">Register Property</button>
      </form>
{/*       <br />
      <label>
        Property Location:
        {isLoaded && (
          <Map center={center} selectedLocation={selectedLocation} coordinates={coordinates} />
        )}
      </label> */}
       
    </div>
  );
};

  /* GOOGLE STUFF */

  /*   const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }; */

  // const { isLoaded, loadError } = useLoadScript({
  //   googleMapsApiKey: googleMapsConfig.apiKey,
  //   libraries: googleMapsConfig.libraries,
  // });

  // const [selectedLocation, setSelectedLocation] = useState(null);
  // const [center, setCenter] = useState({
  //   lat: 41.394043,
  //   lng: 2.173094,
  // });
  // const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

  /* const handleSubmit = async (e) => {
    e.preventDefault();
    const propertyData = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      price: formData.price,
      size: formData.size,
      images: formData.images,
      address: formData.address,
      city: formData.city,
      country: formData.country,
      zipCode: formData.zipCode,
    };
    try {
      await propertyService.addProperty(propertyData);
      navigate(`/`);
      setFormData(initialState);
    } catch (error) {
      console.error(error);
    }
  }; */

  // useEffect(() => {
  //   if (!window.google) return;
  //   const geocoder = new window.google.maps.Geocoder();
  //   geocoder.geocode({ address: formData.address }, (results, status) => {
  //     if (status === "OK") {
  //       const location = results[0].geometry.location;
  //       setSelectedLocation({ lat: location.lat(), lng: location.lng() });
  //       setCenter({ lat: location.lat(), lng: location.lng() });
  //       setCoordinates({ lat: location.lat(), lng: location.lng() });
  //     } else {
  //       setCoordinates({ lat: null, lng: null });
  //     }
  //   });
  // }, [formData.address]);

  // if (loadError) return "Error loading maps";
  // if (!isLoaded) return "Loading maps";

  

export default RegisterPropertyForm;
