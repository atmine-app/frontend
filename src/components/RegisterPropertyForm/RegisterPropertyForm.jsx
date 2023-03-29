import React, { useState, useEffect } from "react";
import propertyService from "../../services/propertyService";
import { useLoadScript } from "@react-google-maps/api";
import Map from "../Map/Map";

const libraries = ["places"];

const initialState = {
  title: "",
  description: "",
  category: "",
  price: "",
  size: "",
  images: "",
  address: "",
  city: "",
  country: "",
  zipCode: "",
};

const RegisterPropertyForm = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries,
  });

  const [formData, setFormData] = useState(initialState);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [center, setCenter] = useState({
    lat: 41.394043,
    lng: 2.173094,
  });
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

  const handleSubmit = async (e) => {
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
      coordinates: coordinates,
    };
    try {
      await propertyService.addProperty(propertyData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (!window.google) return;
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: formData.address }, (results, status) => {
      if (status === "OK") {
        const location = results[0].geometry.location;
        setSelectedLocation({ lat: location.lat(), lng: location.lng() });
        setCenter({ lat: location.lat(), lng: location.lng() });
        setCoordinates({ lat: location.lat(), lng: location.lng() });
      } else {
        setCoordinates({ lat: null, lng: null });
      }
    });
  }, [formData.address]);


  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label htmlFor="category">Category:</label>
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

        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <label htmlFor="size">Size:</label>
        <input
          type="number"
          id="size"
          name="size"
          value={formData.size}
          onChange={handleChange}
          required
        />

        <label htmlFor="images">Images:</label>
        <input
          type="text"
          id="images"
          name="images"
          value={formData.images}
          onChange={handleChange}
        />

        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />

        <label htmlFor="country">Country:</label>
        <input
          type="text"
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
        />
        <label htmlFor="zipCode">Zip Code:</label>
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
  <br />
      <label>
        Property Location:
        {isLoaded && (
          <Map center={center} selectedLocation={selectedLocation} coordinates={coordinates} />
        )}
      </label>
</div>
  );
  };
  
  export default RegisterPropertyForm;
