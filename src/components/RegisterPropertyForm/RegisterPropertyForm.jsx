import React, { useState, useEffect } from "react";
import propertyService from "../../services/propertyService";
import { useNavigate } from "react-router-dom";
import Multiupload from "../Multiupload/Multiupload";
import openAIService from "../../services/openaiService";
import amenitiesOptions from "../../data/amenities";
import categories from "../../data/categories";
import "./RegisterPropertyForm.css";
import BackNavigationFloat from "../BackNavigation/BackNavigationFloat";
import { toast } from "react-toastify";
import { Autocomplete } from "@react-google-maps/api";

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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const scrollToElementWithOffset = (element, offset) => {
    const elementPosition =
      element.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
  };

  const handleAddressInputFocus = () => {
    const addressContainer = document.getElementById("address-container");
    scrollToElementWithOffset(addressContainer, 60);
  };

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

  const handleAddressAutoComplete = (autocomplete) => {
    if (autocomplete) {
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();

        // Extract and update the address components
        const addressComponents = place.address_components;
        let street = "";
        let city = "";
        let country = "";
        let zipCode = "";

        addressComponents.forEach((component) => {
          const types = component.types;

          if (types.includes("street_number")) {
            street = `${component.short_name} `;
          } else if (types.includes("route")) {
            street += component.short_name;
          } else if (types.includes("locality")) {
            city = component.long_name;
          } else if (types.includes("country")) {
            country = component.long_name;
          } else if (types.includes("postal_code")) {
            zipCode = component.short_name;
          }
        });

        // Update the form data
        const updatedFormData = {
          ...formData,
          address: street,
          city,
          country,
          zipCode,
          coordinates: { lat, lng },
        };
        setFormData(updatedFormData);
        onFormDataChange(updatedFormData);
      });
    }
  };

  const onAutocompleteLoad = (autocomplete) => {
    handleAddressAutoComplete(autocomplete);
  };

  useEffect(() => {}, [amenities]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
      toast.success("Property successfully created!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <BackNavigationFloat />
      <div className="register-list">
        <h2>Register your property</h2>
        <form onSubmit={handleSubmit} className="generic-form">
          <div className="form-field">
            <label for="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label for="category">Category:</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label for="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="form-field">
            <label for="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label for="size">Size:</label>
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

          <div id="address-container">
            <div className="form-field">
              <label for="address">Address:</label>
              <Autocomplete
                onLoad={onAutocompleteLoad}
                onPlaceChanged={handleAddressAutoComplete}
              >
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  onFocus={handleAddressInputFocus}
                  required
                />
              </Autocomplete>
            </div>
          </div>

          <div className="form-field">
            <label for="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <label for="country">Country:</label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label for="zipCode">Zip Code:</label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              required
            />
          </div>
          <div className="text-center mt-4">
            <button
              type="submit"
              className={`cta-button full100 ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading ? (
                <div className="spinner-container">
                  <div className="spinner"></div>
                </div>
              ) : (
                "Register Property"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPropertyForm;
