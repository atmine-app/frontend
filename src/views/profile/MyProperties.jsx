import React, { useState, useEffect } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import propertyService from '../../services/propertyService';
import '../booking/bookingList/BookingList.css';
import BackNavigationFloat from '../../components/BackNavigation/BackNavigationFloat';
import PropertyItem from '../property/PropertyItem';
import { RxUpload } from 'react-icons/rx';
import NotFound from '../../components/NotFound/NotFound';

const MyProperties = () => {
  const [properties, setProperties] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleHosting = () => {
    navigate('/register-property');
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const allProperties = await propertyService.getAllProperties();
        const userProperties = allProperties.filter(property => property.owner._id === user._id);
        setProperties(userProperties);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProperties();
  }, [user._id]);

  return (
    <div>
      <BackNavigationFloat />
      <div className="booking-list">
        <h2>My Properties</h2>
        {properties.length > 0 ? (
          <ul>
            {properties.map((property) => (
              <Link to={`/profile/properties/${property._id}`} key={property._id}>
                <li className="booking-list__item" key={property._id}>
                  <PropertyItem property={property} />
                </li>
              </Link>
            ))}
          </ul>
        ) : (
          <>
            <p>No properties found.</p>
            <NotFound />
            <div className="profileSection section" onClick={handleHosting}>
              <RxUpload className="profileIcon" />
              <h2 className="profileSectionTitle">Hosting</h2>
              <p>List your space here and start earning money with us</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyProperties;
