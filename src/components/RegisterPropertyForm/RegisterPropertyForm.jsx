import React, { useState } from "react";
import propertyService from "../../services/propertyService";

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
  const [formData, setFormData] = useState(initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newProperty = await propertyService.addProperty(formData);
      console.log(newProperty);
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

  return (
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


);
};

export default RegisterPropertyForm;