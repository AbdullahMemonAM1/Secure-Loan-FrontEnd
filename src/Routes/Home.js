import React from "react";
import Navbar from "../Components/Navbar";
import crypto from "../images/crypto.jpg";
import Card3 from "../Components/Card3";
import why from ".././images/Web.jpg";
import homepage1 from ".././images/home1.png";
import fyp1 from ".././images/web1.jpg";
import fyp2 from ".././images/fyppic.jpg";
import fyp3 from ".././images/web3.jpg";
import fyp4 from ".././images/block.jpg";
import lap from ".././images/lap.png";
import { useState, useEffect } from "react";
import Slider from "../Components/Slider";
import "../css/Home.css";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible1, setIsVisible1] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Example logic to determine user role based on authentication status
    const user = localStorage.getItem("user");
    if (user === null) {
      setIsAuthenticated(false);
      setUserRole(null); // Ensure userRole is null when not authenticated
    } else {
      setIsAuthenticated(true);
      const userData = JSON.parse(user);
      setUserRole(userData.status);
    }
  }, [isAuthenticated]);

  const handleJoinNowClick = () => {
    if (userRole === null) window.location.href = "/signup";
    if (userRole === "Lender" || userRole === "Borrower")
      window.location.href = "/";
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 200;
      if (scrollY > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      // Adjust the value based on when you want the div to be revealed
      if (scrollY > 900) {
        setIsVisible1(true);
      }
      if (scrollY < 300) {
        setIsVisible1(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      {/* <Navbar /> */}
      <div className="flex" style={{ justifyContent: "center" }}>
        <img
          style={{ width: "100vw", height: "90vh", position: "relative" }}
          src={crypto}
          alt="img cant load"
        />
        <h1
          style={{
            fontSize: "30px",
            position: "absolute",
            color: "white",
            marginLeft: "50vw",
            marginTop: "20vh",
          }}
        >
          Revolutionizing Loans; One transaction at a time
        </h1>
        <button
          style={{
            position: "absolute",
            marginLeft: "50vw",
            marginTop: "28vh",
            padding: "10px 20px",
            backgroundColor: "transparent",
            color: "white",
            border: "white solid",
            borderRadius: "5px",
            fontSize: "18px",
            cursor: "pointer",
          }}
          onClick={handleJoinNowClick}
        >
          Join Now
        </button>

        <div
          style={{
            position: "absolute",
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "45vh",
            marginLeft: "6vw",
          }}
        ></div>
      </div>

      <div
        className={`animated-content ${isVisible ? "visible" : ""}`}
        style={{
          marginTop: "1vh",
          display: "flex",
          marginLeft: "2vw",
          fontFamily: "Ubuntu, sans-serif",
          marginright: isVisible ? 0 : "100vw", // Initial position outside the viewport
        }}
      >
        <img src={homepage1} alt="" style={{ width: "30vw" }} />
        <div style={{ marginTop: "15vh", marginLeft: "2vw", width: "50%" }}>
          <h1 style={{ fontSize: "1.5rem", fontFamily: "Ubuntu" }}>Why Us?</h1>
          <h4 className="mt-4">
            Experience seamless exploration of financing options with our
            platform's intuitive search and navigational features. Effortlessly
            browse through a diverse range of loan products tailored to your
            specific requirements, ensuring you find the perfect fit for your
            needs.
          </h4>
          <h4 className="mt-1">
            <img src="" alt="" /> Enjoy the flexibility of custom loan solutions
            designed to meet your unique financial goals. Whether you're seeking
            funding for a business venture, personal project, or other
            endeavors, our platform offers tailored loan options that align with
            your specific circumstances and objectives.
          </h4>
        </div>
      </div>
      <div
        className={`animated-content ${isVisible ? "visible" : ""}`}
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          fontFamily: "Ubuntu, sans-serif",
          marginright: isVisible ? 0 : "100vw", // Initial position outside the viewport

          marginright: "5vw",
        }}
      >
        <img src={why} alt="" style={{ width: "35vw", marginright: "5vw" }} />
        <div style={{ marginTop: "15vh", marginLeft: "2vw", width: "50%" }}>
          <h1 style={{ fontSize: "1.5rem", fontFamily: "Ubuntu" }}>
            What's New?
          </h1>
          <h4 className="mt-4">
            Enjoy a user-centric interface designed to simplify the blockchain
            loan application journey.
          </h4>
          <h4 className="mt-1">
            <img src="" alt="" /> Benefit from the smart logic integrated into
            the app, ensuring that your loan proposal aligns with industry
            standards and regulatory requirements.
          </h4>

          <h4 className="mt-1">
            Navigate the blockchain loan application process with ease through
            our intuitive and user-friendly interface.
          </h4>
        </div>
      </div>
      <div
        style={{
          height: "33vh",
          backgroundColor: "#1e81b0",
          color: "white ",
        }}
        className={`info-container ${isVisible1 ? "visible" : ""}`}
      >
        <h1
          style={{
            width: "15%",
            margin: "auto",
            fontFamily: "Rubik",
            fontSize: "1.6rem",
            paddingTop: "3vh",
          }}
        >
          What We Offer?
        </h1>
        <p
          style={{
            width: "70%",
            margin: "auto",
            paddingTop: "2vh",
            fontSize: "1.2rem",
          }}
        >
          We believe that a substantial portion of the unbanked and undocumented
          population, aspiring for progressive financial improvement through
          blockchain-based financing, can significantly benefit from our
          platform. This user-friendly app empowers individuals to confidently
          explore blockchain loans with the guidance of a team of seasoned
          blockchain experts. Our goal is to bridge the gap between the unbanked
          population and financial inclusion by providing a reliable and
          accessible avenue for blockchain-backed financial growth.
        </p>
      </div>

      <div
        className={`animated-content ${isVisible ? "visible" : ""}`}
        style={{
          marginTop: "1vh",
          display: "flex",
          marginLeft: "2vw",
          fontFamily: "Ubuntu, sans-serif",
          marginright: isVisible ? 0 : "100vw", // Initial position outside the viewport
        }}
      >
        <img src={fyp2} alt="" style={{ width: "30vw" }} />
        <div style={{ marginTop: "5vh", marginLeft: "2vw", width: "50%" }}>
          <h1 style={{ fontSize: "1.5rem", fontFamily: "Ubuntu" }}>
            Enhanced Security Measures
          </h1>
          <h4 className="mt-4">
            Rest assured with the highest level of security provided by
            blockchain technology. Your data is stored in tamper-proof records,
            reducing the risk of fraud and ensuring the utmost confidentiality.
          </h4>
          <h4 className="mt-1">
            <img src="" alt="" /> Experience transparency like never before.
            With blockchain, every transaction is recorded and visible to all
            parties involved, fostering trust and accountability throughout the
            lending process.
          </h4>
          <h4 className="mt-1">
            Enjoy the peace of mind that comes with immutable records. Once
            recorded on the blockchain, your loan information cannot be altered
            or tampered with, providing a secure and reliable record of your
            financial transactions.
          </h4>
        </div>
      </div>
      <div
        className={`animated-content ${isVisible ? "visible" : ""}`}
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          fontFamily: "Ubuntu, sans-serif",
          marginright: isVisible ? 0 : "100vw", // Initial position outside the viewport

          marginright: "5vw",
        }}
      >
        <img src={fyp1} alt="" style={{ width: "35vw", marginright: "5vw" }} />
        <div style={{ marginTop: "5vh", marginLeft: "2vw", width: "50%" }}>
          <h1 style={{ fontSize: "1.5rem", fontFamily: "Ubuntu" }}>
            Continuous Innovation
          </h1>
          <h4 className="mt-4">
            Stay ahead of the curve with our commitment to continuous
            innovation. We constantly monitor and adapt to emerging trends in
            the lending industry, ensuring that our platform remains at the
            forefront of technological advancements.
          </h4>
          <h4 className="mt-1">
            <img src="" alt="" /> Benefit from the smart logic integrated into
            the app, ensuring that your loan proposal aligns with industry
            standards and regulatory requirements.
          </h4>

          <h4 className="mt-1">
            Benefit from the integration of cutting-edge technologies into our
            platform. From artificial intelligence to machine learning, we
            leverage the latest innovations to optimize decision-making
            processes and enhance the efficiency of our services.
          </h4>
        </div>
      </div>

      <div
        style={{
          marginTop: "5vh",
          marginBottom: "5vh",
        }}
      >
        <h1
          style={{
            width: "20vw",
            margin: "auto",
            fontFamily: "Kanit",
            fontSize: "1.6rem",
            marginBottom: "5vh",
          }}
          className="text-gray-700 text-base"
        >
          Our Advantages Include
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "7vh",
          }}
        >
          <Card3
            image={fyp3}
            h1="Decentralization"
            des="Utilizes blockchain technology to establish a decentralized network where no single entity has control over the entire loan system and Enhances security and reduces the risk of manipulation or fraud."
          />
          <Card3
            image={fyp4}
            h1="Smart Contracts"
            des="Implements smart contracts to automate and enforce the terms and conditions of loans without the need for intermediaries and Enables self-executing contracts that automatically trigger actions when predefined conditions are met."
          />
          <Card3
            image={lap}
            h1="Immutable Ledger"
            des="Maintains an immutable and transparent ledger of all loan transactions on the blockchain and Ensures that once a record is added to the blockchain, it cannot be altered or deleted, providing a reliable audit trail."
          />
        </div>
      </div>
    </>
  );
};

export default Home;
