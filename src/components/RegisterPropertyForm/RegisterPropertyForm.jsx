import React, { useState } from "react";
import propertyService from "../../services/propertyService";
import { useNavigate } from "react-router-dom";
import Multiupload from "../Multiupload/Multiupload";
import "./RegisterPropertyForm.css";
import openAIService from "../../services/openaiService";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const propertyData = {
        ...formData,
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
      <form onSubmit={handleSubmit} className="registerPropertyFormContainer">
        <div className="formColumn">
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

        <div className="formColumn">
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

        <label>Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <div className="formColumn">
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

        <div className="formColumn">
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

        <label>Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <div className="formColumn">
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
        <div className="formColumn">
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
    </div>
  );
};

export default RegisterPropertyForm;
