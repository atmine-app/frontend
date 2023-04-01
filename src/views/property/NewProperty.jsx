import React,{useState} from 'react'
import RegisterPropertyForm from '../../components/RegisterPropertyForm/RegisterPropertyForm'
import Map from '../../components/Map/Map'

export default function NewProperty() {
  const [address, setAddress] = useState('');

  const handleAddressChange = (newAddress) => {
    setAddress(newAddress);
  };
  return (
    <div>
    <RegisterPropertyForm  onAddressChange={handleAddressChange}/>
    <label>
        Property Location:
        <Map address={address} />
      </label>
    </div>
  )
}
