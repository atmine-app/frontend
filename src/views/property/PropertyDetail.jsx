import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import propertyService from '../../services/propertyService';
import CardDetail from '../../components/Card/CardDetail';
import Map from '../../components/Map/Map';
// import { googleMapsConfig } from '../../googleMapsConfig';
// import { useLoadScript } from '@react-google-maps/api';
import authService from '../../services/authService';
// import ReviewForm from '../../components/ReviewForm/ReviewForm';
// import Calendar from '../../components/Calendar/Calendar';

export default function PropertyDetail() {
  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const getProperty = async () => {
    try {
      const response = await propertyService.getProperty(propertyId);
      setProperty(response);
    } catch (error) {
      console.error(error);
    }
  };

  const getCurrentUser = async () => {
    try {
      const response = await authService.getCurrentUser();
      setCurrentUser(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProperty();
    getCurrentUser();
    // eslint-disable-next-line
  }, [propertyId]);

  // const { isLoaded, loadError } = useLoadScript({
  //   googleMapsApiKey: googleMapsConfig.apiKey,
  //   libraries: googleMapsConfig.libraries,
  // });

  // if (loadError) return "Error loading maps";
  // if (!isLoaded) return "Loading maps";

  return (
    <div>
      {property && currentUser && (
        <>
          <CardDetail property={property} currentUser={currentUser} />
          {/* <ReviewForm propertyId={propertyId}/> */}
        </>
      )}
    </div>
  );
}