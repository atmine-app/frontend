import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react'
import Card from '../components/Card/Card';

export default function Properties() {
  const [properties, setProperties] = useState(null);

  const getProperties = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/"
      );
      setProperties(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    getProperties();
  }, []);

  return (
    <div>
      <h1>All Properties</h1>
      {properties &&
        properties.map((property) => {
          return (
          <div key={property._id}>
            <Card property={property} />
          </div>
        )
        })}
    </div>
  );
}
