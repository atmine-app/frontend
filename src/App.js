import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './views/Home';
import Navbar from './components/Navbar/Navbar';
import ErrorPage from './views/ErrorPage';
import NotFound from './views/NotFound';
import Signup from './views/auth/Signup';
import Login from './views/auth/Login';
import PrivateView from './views/PrivateView';
import IsPrivate from './components/IsPrivate';
import PropertyDetail from './views/property/PropertyDetail'
import EditProperty from './views/property/EditProperty';
import NewProperty from './views/property/NewProperty';
import NewBooking from './views/booking/newBooking/NewBooking';
import BookingConfirmation from './views/booking/bookingconfirmation/BookingConfirmation';
import MyProfile from './views/profile/MyProfile';
import BookingList from './views/booking/bookingList/BookingList';
import BookingDetail from './views/booking/bookingDetail/BookingDetail';
import Payment from './components/Payment/Payment';
import Multiupload from './components/Multiupload/Multiupload';
import ChatComponent from './components/Chat/ChatComponent';
import InboxComponent from './components/Chat/InboxComponent';
import PuffLoader from "react-spinners/PuffLoader";

function App() {
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <PuffLoader color={"#60c2a4"}/>
      </div>
    );
  }

  return (
    <div className="App">
      <Toaster/>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pay" element={<Payment />} />
        <Route path="/upload" element={<Multiupload />} />
        <Route path="/profile" element={<IsPrivate><MyProfile/></IsPrivate>} /> 
        <Route path="/private" element={<IsPrivate><PrivateView /></IsPrivate>} />
        <Route path="/register-property" element={<IsPrivate><NewProperty /></IsPrivate>} />
        <Route path='/properties/:propertyId' element={<PropertyDetail />}/>
        <Route path='/properties/:propertyId/edit' element={<EditProperty />}/>
        <Route path='/properties/:propertyId/:range' element={<NewBooking />}/>
        <Route path="/bookings" element={<IsPrivate><BookingList /></IsPrivate>} />
        <Route path="/bookings/:bookingId" element={<IsPrivate><BookingDetail /></IsPrivate>} />
        <Route path="/bookings/:bookingId/confirmation" element={<IsPrivate><BookingConfirmation /></IsPrivate>} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/chat/:otherUserId" element={<ChatComponent />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/messages" element={<InboxComponent />} />
      </Routes>
    </div>
  );
}

export default App;
