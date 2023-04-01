import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import CardDetail from '../../components/Card/CardDetail'
import Map from '../../components/Map/Map'
import propertyService from '../../services/propertyService'


export default function PropertyDetail() {
  const { propertyId } = useParams();
  const [property, setProperty] = useState({});

  const getProperty = async () => {
    try {
      const response = await propertyService.getProperty(propertyId);
      setProperty(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProperty()
    // eslint-disable-next-line
  }, [propertyId])

  return (
    <div>
    <CardDetail property={property}/>
    <Map formData={property}/>
    </div>
  )
}