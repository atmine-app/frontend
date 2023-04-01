import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import CardDetail from '../../components/Card/CardDetail'
import Map from '../../components/Map/Map'
import ReviewForm from '../../components/ReviewForm/ReviewForm'
import propertyService from '../../services/propertyService'
import Reviews from '../../components/Reviews/Reviews'
import reviewService from '../../services/reviewService'


export default function PropertyDetail() {
  const { propertyId } = useParams();
  const [property, setProperty] = useState({});
  const [reviews, setReviews] = useState([]);

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

  const getReviews = async () => {
    try {
      console.log('im inside getReviews')
      const response = await reviewService.getReviews(propertyId);
      setReviews(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReviews();
    // eslint-disable-next-line
  }, [propertyId]);

  const handleReviewSubmit = async (review) => {
    try {
      await reviewService.createReview(propertyId, review);
      getReviews();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
    <CardDetail property={property}/>
    <Map formData={property}/>
    <br />
    <ReviewForm propertyId={propertyId} handleReviewSubmit={handleReviewSubmit}/>
    <Reviews reviews={reviews}/>
    </div>
  )
}