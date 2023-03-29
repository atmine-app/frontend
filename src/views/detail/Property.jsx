import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import propertyService from '../../services/propertyService';
import Card from '../../components/Card/Card';

export default function PropertyDetail() {
  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);

  const getProperty = async () => {
    try {
      const response = await propertyService.getProperty(propertyId);
      setProperty(response);
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getProperty();
    // eslint-disable-next-line
  }, [propertyId])

  return (
    <div>
      {property && <Card property={property} />}
    </div>
  )
}