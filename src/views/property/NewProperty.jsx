import React,{useState} from 'react'
import RegisterPropertyForm from '../../components/RegisterPropertyForm/RegisterPropertyForm'
import Map from '../../components/Map/Map'


export default function NewProperty() {
  const [formData, setFormData] = useState('');
  const [coordinates, setCoordinates] = useState(null);

  const handleFormChange = (updatedFormData) => {
    setFormData(updatedFormData);
    console.log(formData)
  };

  const handleLocationChange = (coordinates) => {
    setCoordinates(coordinates);
  };

  return (
    <div>
      <RegisterPropertyForm onFormDataChange={handleFormChange} coordinates={coordinates} />
      <label>
        Property Location:
        <Map formData={formData} onLocationChange={handleLocationChange} />
      </label>
    </div>
  )
}

