import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import propertyService from '../../services/propertyService';
import Card from '../../components/Card/Card';
import Map from '../../components/Map/Map';
import { googleMapsConfig } from '../../googleMapsConfig';
import { useLoadScript } from '@react-google-maps/api';

export default function PropertyDetail() {
  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);

  const getProperty = async () => {
    try {
      const response = await propertyService.getProperty(propertyId);
      setProperty(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProperty();
    // eslint-disable-next-line
  }, [propertyId]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: googleMapsConfig.apiKey,
    libraries: googleMapsConfig.libraries,
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (
    <div>
      {property && (
        <>
          <Card property={property} />
          <Map center={property.coordinates} selectedLocation={property.coordinates} />
        </>
      )}
    </div>
  );
}
