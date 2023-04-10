import React, { useState, useEffect } from "react";
import propertyService from "../../services/propertyService";
import { useNavigate } from "react-router-dom";
import Multiupload from "../Multiupload/Multiupload";
import openAIService from "../../services/openaiService";
import amenitiesOptions from "../../data/amenities";
import "./RegisterPropertyForm.css";

const RegisterPropertyForm = ({ onFormDataChange, coordinates }) => {
  const [images, setImages] = useState({ array: [] });
  const initialState = {
    title: "",
    description: "",
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

  const [amenities, setSelectedAmenities] = useState([]);

  const handleAmenityChange = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setSelectedAmenities((prevAmenities) => [...prevAmenities, name]);
    } else {
      setSelectedAmenities((prevAmenities) =>
        prevAmenities.filter((amenity) => amenity !== name)
      );
    }
  };

  useEffect(() => {
    console.log("selected amenities: ", amenities);
  }, [amenities]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const propertyData = {
        ...formData,
        amenities,
        coordinates,
        images,
        summary: "",
      };
      const summary = await openAIService.summarize(formData.description);
      propertyData.summary = summary;
      const createdProperty = await propertyService.addProperty(propertyData);
      navigate(`/properties/${createdProperty._id}`);
      setFormData(initialState);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="genericForm">
        <div className="formField">
          <label>Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="formField">
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
        </div>

        <div className="formField">
        <label>Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        </div>

        <div className="formField">
          <label>Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="formField">
          <label>Size:</label>
          <input
            type="number"
            id="size"
            name="size"
            value={formData.size}
            onChange={handleChange}
            required
          />
        </div>

        <label>Images:</label>
        <Multiupload onImageDataChange={handleFormImageChange} />

        <div className="formField">
        <label>Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        </div>
        
        <div className="formField">
          <label>City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formField">
          <label>Country:</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="formField">
        <label>Zip Code:</label>
        <input
          type="text"
          id="zipCode"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          required
        />
        </div>

        <div>
          <label>Amenities:</label>
          <div className="amenities">
            {amenitiesOptions.map((amenity) => (
              <label key={amenity.value}>
                <input
                  type="checkbox"
                  name={amenity.value}
                  checked={amenities.includes(amenity.value)}
                  onChange={handleAmenityChange}
                />
                {amenity.label}
              </label>
            ))}
          </div>
        </div>
        <button className="cta-button propertyForm" type="submit">Register Property</button>
      </form>
    </div>
  );
};

export default RegisterPropertyForm;
