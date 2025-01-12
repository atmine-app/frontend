import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import usePageLoader from "./hooks/usePageLoader";
import Home from "./views/Home";
import Navbar from "./components/Navbar/Navbar";
import ErrorPage from "./views/ErrorPage";
import NotFound from "./views/NotFound";
import Signup from "./views/auth/Signup";
import Login from "./views/auth/Login";
import PrivateView from "./views/PrivateView";
import IsPrivate from "./components/IsPrivate";
import PropertyDetail from "./views/property/PropertyDetail";
import EditProperty from "./views/property/EditProperty";
import NewProperty from "./views/property/NewProperty";
import NewBooking from "./views/booking/newBooking/NewBooking";
import MyProfile from "./views/profile/MyProfile";
import BookingList from "./views/booking/bookingList/BookingList";
import BookingDetail from "./views/booking/bookingDetail/BookingDetail";
import ChatComponent from "./components/Chat/ChatComponent";
import InboxComponent from "./components/Chat/InboxComponent";
import EditProfile from "./views/profile/EditProfile";
import WishList from "./views/wishlist/WishList";
import MyReservations from "./views/profile/MyReservations";
import MyProperties from "./views/profile/MyProperties";
import MyPropertyDetails from "./views/profile/MyPropertyDetails";
import SplashPage from "./components/SplashPage/SplashPage";
import PuffLoader from "react-spinners/PuffLoader";

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(true);
  const isPageLoading = usePageLoader();

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const timeoutId = setTimeout(() => {
      const hasVisitedHomePage = localStorage.getItem("hasVisitedHomePage");
      if (location.pathname === "/" && !hasVisitedHomePage) {
        const timeoutId = setTimeout(() => {
          setLoading(false);
          localStorage.setItem("hasVisitedHomePage", true);
        }, 5000);
        return () => {
          clearTimeout(timeoutId);
        };
      } else {
        setLoading(false);
      }
    }, [location.pathname]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const cleanupLocalStorage = () => {
      localStorage.removeItem("hasVisitedHomePage");
    };

    window.addEventListener("beforeunload", cleanupLocalStorage);
    return () => {
      window.removeEventListener("beforeunload", cleanupLocalStorage);
    };
  }, []);

  useEffect(() => {
    const isPropertyDetailPage = /^\/properties\/[^/]+$/.test(
      location.pathname
    );
    setShowNavbar(!isPropertyDetailPage);
  }, [location.pathname]);

  if (loading) {
    return <SplashPage />;
  }

  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {showNavbar && <Navbar />}
      {isPageLoading && (
        <div className="loading-container">
          <PuffLoader color="#605cb8" loading={isPageLoading} size={60} />
        </div>
      )}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <IsPrivate>
              <MyProfile />
            </IsPrivate>
          }
        />
        <Route
          path="/profile/edit"
          element={
            <IsPrivate>
              <EditProfile />
            </IsPrivate>
          }
        />
        <Route
          path="/profile/properties"
          element={
            <IsPrivate>
              <MyProperties />
            </IsPrivate>
          }
        />
        <Route
          path="/profile/properties/:propertyId"
          element={
            <IsPrivate>
              <MyPropertyDetails />
            </IsPrivate>
          }
        />
        <Route
          path="/profile/properties/:propertyId/bookings"
          element={
            <IsPrivate>
              <MyReservations />
            </IsPrivate>
          }
        />
        <Route
          path="/profile/properties/:propertyId/edit"
          element={
            <IsPrivate>
              <EditProperty />
            </IsPrivate>
          }
        />
        <Route
          path="/private"
          element={
            <IsPrivate>
              <PrivateView />
            </IsPrivate>
          }
        />
        <Route
          path="/register-property"
          element={
            <IsPrivate>
              <NewProperty />
            </IsPrivate>
          }
        />
        <Route
          path="/wishlist"
          element={
            <IsPrivate>
              <WishList />
            </IsPrivate>
          }
        />
        <Route path="/properties/:propertyId" element={<PropertyDetail />} />
        <Route path="/properties/:propertyId/edit" element={<EditProperty />} />
        <Route path="/properties/:propertyId/:range" element={<NewBooking />} />
        <Route
          path="/bookings"
          element={
            <IsPrivate>
              <BookingList />
            </IsPrivate>
          }
        />
        <Route
          path="/bookings/:bookingId"
          element={
            <IsPrivate>
              <BookingDetail />
            </IsPrivate>
          }
        />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/chat/:otherUserId" element={<ChatComponent />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/messages" element={<InboxComponent />} />
      </Routes>
    </div>
  );
}

export default App;
