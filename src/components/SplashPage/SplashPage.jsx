import React, { useState, useEffect } from "react";
import PuffLoader from "react-spinners/PuffLoader";
import "./SplashPage.css";
import atminelogo from "../../assets/atmine_1.svg";

function SplashPage() {
  const [firstText, setFirstText] = useState("");
  const [secondText, setSecondText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const firstTimeoutId = setTimeout(() => {
      const text = "Discover unique spaces to rent.";
      for (let i = 0; i < text.length; i++) {
        setTimeout(() => {
          setFirstText(text.substring(0, i + 1));
        }, 50 * i);
      }
    }, 1000);

    const secondTimeoutId = setTimeout(() => {
      const text = "<strong>atmine</strong> has something for everyone.";
      for (let i = 0; i < text.length; i++) {
        setTimeout(() => {
          setSecondText(text.substring(0, i + 1));
        }, 40 * i);
      }
      setTimeout(() => {
        setLoading(false);
      }, 5000);
    }, 2500);

    return () => {
      clearTimeout(firstTimeoutId);
      clearTimeout(secondTimeoutId);
    };
  }, []);

  return (
    <div className="my-splash-container">
      <div className="my-loader-container">
        <PuffLoader color={"#dbef98"} size={60} loading={loading} />
      </div>
      <div className="my-splash-heading-container">
        <h1 className="my-splash-title">Welcome to</h1>
        <img src={atminelogo} alt="atminelogolime" style={{ width: "150px", height: "50px", marginLeft: "10px", marginBottom: "20px" }} />
      </div>
      <p className="my-splash-text">{firstText}</p>
      <p
        className="my-splash-text"
        dangerouslySetInnerHTML={{ __html: secondText }}
      />
    </div>
  );
}

export default SplashPage;