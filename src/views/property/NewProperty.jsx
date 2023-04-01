import React,{useState} from 'react'
import RegisterPropertyForm from '../../components/RegisterPropertyForm/RegisterPropertyForm'
import Map from '../../components/Map/Map'

export default function NewProperty() {
  const [formData, setFormData] = useState('');

  const handleFormChange = (newAddress) => {
    setFormData(newAddress);
    console.log(formData)
  };

  
  return (
    <div>
    <RegisterPropertyForm  onFormDataChange={handleFormChange}/>
    <label>
        Property Location:
        <Map formData={formData} />
      </label>
    </div>
  )
}
