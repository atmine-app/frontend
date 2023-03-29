import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './views/Home';
import Navbar from './components/Navbar';
import ErrorPage from './views/ErrorPage';
import NotFound from './views/NotFound';
import Signup from './views/auth/Signup';
import Login from './views/auth/Login';
import PrivateView from './views/PrivateView';
import IsPrivate from './components/IsPrivate';
import RegisterPropertyForm from './components/RegisterPropertyForm/RegisterPropertyForm';
import Property from './views/detail/Property'
import EditProperty from './views/detail/EditProperty';

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
        <Route path="/register-property" element={<IsPrivate><RegisterPropertyForm /></IsPrivate>} />
        <Route path='/:propertyId' element={<Property />}/>
        <Route path='/edit/:propertyId' element={<EditProperty />}/>
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
