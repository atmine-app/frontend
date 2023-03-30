import './App.css';
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
import NewBooking from './views/booking/NewBooking';

function App() {
  return (
    <div className="App">
      <Toaster/>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/private" element={<IsPrivate><PrivateView /></IsPrivate>} />
        <Route path="/register-property" element={<IsPrivate><NewProperty /></IsPrivate>} />
        <Route path='/properties/:propertyId' element={<PropertyDetail />}/>
        <Route path='/properties/:propertyId/edit' element={<EditProperty />}/>
        <Route path='/properties/:propertyId/book' element={<NewBooking />}/>
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
