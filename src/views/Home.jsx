import React from 'react'
import propertyService from '../services/propertyService'
import { useState, useEffect } from 'react'
import Card from '../components/Card/Card';

export default function Properties() {
  const [properties, setProperties] = useState(null);
  
  const getAllProperties = async () => {
    try {
      const response = await propertyService.getAllProperties();
      setProperties(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllProperties()
  }, [])

  return (
    <div>
      <h1>All Properties</h1>
      <div className="card__container">
      {properties &&
        properties.map((property) => {
          return (
          <div key={property._id}>
            <Card property={property} />
          </div>
        )
        })}
    </div>
    </div>
  );
}
