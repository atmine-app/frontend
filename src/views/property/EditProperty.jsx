import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import propertyService from "../../services/propertyService";
import BackNavigationFloat from "../../components/BackNavigation/BackNavigationFloat";

export default function EditProperty() {
  const { propertyId } = useParams();

  const [property, setProperty] = useState({
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
  });

  const navigate = useNavigate();

  const getProperty = async () => {
    try {
      const response = await propertyService.getProperty(propertyId);
      setProperty(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProperty();
    // eslint-disable-next-line
  }, [propertyId]);

  const handleChange = (e) => {
    setProperty(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await propertyService.editProperty(propertyId, property);
      navigate(`/properties/${propertyId}`)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
    <BackNavigationFloat />
      <h2>Edit Property</h2>
      <form onSubmit={handleSubmit} className="genericForm">
        <label>Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={property.title}
          onChange={handleChange}
          required
        />

        <label>Description:</label>
        <textarea
          id="description"
          name="description"
          value={property.description}
          onChange={handleChange}
          required
        />

        <label>Category:</label>
        <select
          id="category"
          name="category"
          value={property.category}
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
          value={property.price}
          onChange={handleChange}
          required
        />

        <label>Size:</label>
        <input
          type="number"
          id="size"
          name="size"
          value={property.size}
          onChange={handleChange}
          required
        />

        <label>Images:</label>
        <input
          type="text"
          id="images"
          name="images"
          value={property.images}
          onChange={handleChange}
        />

        <label>Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={property.address}
          onChange={handleChange}
          required
        />

        <label>City:</label>
        <input
          type="text"
          id="city"
          name="city"
          value={property.city}
          onChange={handleChange}
          required
        />

        <label>Country:</label>
        <input
          type="text"
          id="country"
          name="country"
          value={property.country}
          onChange={handleChange}
          required
        />
        <label>Zip Code:</label>
        <input
          type="text"
          id="zipCode"
          name="zipCode"
          value={property.zipCode}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit Changes</button>
      </form>
    </div>
  );
}
