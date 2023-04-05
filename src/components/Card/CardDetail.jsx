// // import React from "react";
// // import { Link } from "react-router-dom";
// // import { useNavigate } from "react-router-dom";
// // import "./Card.css";
// // import propertyService from "../../services/propertyService";

// // export default function CardDetail({ property, propertyId, rating }) {
// //   /*  const isOwner = x.owner && currentUser && x.owner._id === currentUser._id; */
// //   const navigate = useNavigate();
// //   const handleDelete = async (propertyId) => {
// //     try {
// //       await propertyService.deleteProperty(propertyId);
// //       navigate("/");
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   return (
//   <div className="property__card-detail">
//   <div className="property__card-images">
//     {property.images && property.images.length > 0 && property.images.map((image, index) => (
//       // eslint-disable-next-line jsx-a11y/img-redundant-alt
//       <img key={index} src={image} alt={`${property.title} - Image ${index + 1}`} />
//     ))} 
//   </div>
//   <div className="property__card-content">
//     <h2>{property.title}</h2>
//     <p>Host: {property.owner && property.owner.username}</p>
//     <p>Catergory: {property.category}</p>
//     <p>Description: {property.description}</p>
//     <p>Price: {property.price}</p>
//     <p>Size: {property.size}</p>
//     <p>Address: {property.address}</p>
//     <p>City: {property.city}</p>
//     <p>Rating: {rating && rating && rating.averageRating} </p>
//   </div>
//   { rating && <div className="ratingsContainer">
//     <p>Location: {rating && rating && rating.location}</p>
//     <p>Cleanliness: {rating && rating && rating.cleanliness}</p>
//     <p>Communication: {rating && rating && rating.communication}</p>
//     <p>Value: {rating && rating && rating.valueForMoney}</p>
//     <p>Amenities: {rating && rating && rating.amenities}</p>
//   </div> }
//   <div className="card-buttons">
//     <>
//       <button type="submit">
//         <Link to={`/properties/${property._id}/edit`} className="nav-link">
//           Edit
//         </Link>
//       </button>
//       <button type="submit" onClick={() => handleDelete(propertyId)}>
//         Delete
//       </button>
//     </>
//   </div>
// </div>
// //   );
// // }
