import React, { useEffect, useState } from "react";
import LendNavbar from "../Components/LenderNavbar";
import Card from "../Components/Card";
import LendDashCard from "../Components/LenderDashCard";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import abi from "../abi_auth.json"; // Replace with the actual path to your ABI file
import Web3 from "web3";
import { Pagination, Box } from "@mui/material";

const LenderDashboard = () => {
  const [packages, setPackages] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = React.useState(1); // Current page number
  const itemsPerPage = 3; // Number of loans per page (adjust as needed)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const displayedLoans = packages.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  function getPackages() {
    setIsLoading(true);
    fetch("http://localhost:3002/packages/lender/all")
      .then((response) => response.json())
      .then((data) => {
        console.log(data["results"]);
        // Process API response and set state
        setPackages(data["results"]); // Assuming the response has a 'packages' property
      })
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => {
        setIsLoading(false); // Always set isLoading to false when fetch is done
      });
  }

  async function getUserInfo() {
    const wallet = localStorage.getItem("account");
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      abi,
      "0xE297247210B0416A3BC72e49730aC24D33838C28"
    ); // Replace with your contract address
    try {
      console.log("AHAHA");
      const userData = await contract.methods.getUserInfo(wallet).call();
      setUserInfo(userData);
      console.log(userData);
    } catch (err) {}
  }

  useEffect(() => {
    // Fetch data from API
    getPackages();
    getUserInfo();
  }, []);

  return (
    <div>
      <LendNavbar />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          //maxWidth: "600px",
          margin: "50px auto 0",
        }}
      >
        <a href="/createpackage" style={createPackagesStyle}>
          Create Packages
        </a>
        <a href="/MyPackage" style={myPackagesStyle}>
          My Packages
        </a>
        <a href="/ActivePackage" style={myPackagesStyle}>
          Active Packages
        </a>
      </div>

      <div style={{ display: "flex", margin: "auto", width: "80%" }}>
        <div>
          {isLoading ? ( // Show loader if isLoading is true
            <div style={{}}>
              <div className="loader-container">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                    minWidth: "80vw",
                  }}
                >
                  {/* Choose your preferred loader component or animation here */}
                  <CircularProgress />
                  {/* Example using Material-UI's CircularProgress */}
                </div>
              </div>
            </div>
          ) : packages.length === 0 ? ( // Show message if no packages available
          <div style={{}}>
          <div className="loader-container">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                minWidth: "80vw",
              }}
            >
              {/* Choose your preferred loader component or animation here */}
              <center>
              <br/>
              <h1>No requests available</h1>
            </center>              {/* Example using Material-UI's CircularProgress */}
            </div>
          </div>
        </div>      
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {displayedLoans.map((packageItem) => (
                <Link
                  to={`/lenderloaninfo/${packageItem.id}`}
                  key={packageItem.id}
                >
                  <Card
                    //wallet
                    user={packageItem.borrower}
                    des={packageItem.description}
                    det={packageItem.repaymentTerm}
                    Active={packageItem.isActive}
                    repaydate={packageItem.repaymentDueDate}
                    lender={packageItem.lender}
                    interestrate={packageItem.interestRate}
                    repaymentterm={packageItem.repaymentTerm}
                    penaltyrate={packageItem.penaltyRate}
                  />
                </Link>
              ))}
              <Pagination
                count={Math.ceil(packages.length / itemsPerPage)} // Total pages
                page={page}
                onChange={handleChangePage}
                color="primary"
              />
            </Box>
          )}
        </div>
        <div
          style={{
            height: "20vh",
            marginLeft: "2vw",
            width: "20vw",
            marginTop: "1.5vh",

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {packages.length !== 0 && (
            // Check if userInfo is loaded before rendering
            <div>
              <LendDashCard
                Name={userInfo[0]}
                Role={userInfo[1]}
                Email={userInfo[2]}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const buttonStyle = {
  marginRight: "20px",
  marginLeft: "20px",

  width: "200px",
  height: "200px",
  backgroundColor: "#007bff",
  color: "white",
  textAlign: "center",
  lineHeight: "200px",
  fontSize: "20px",
  borderRadius: "10px",
  textDecoration: "none",
  transition: "background-color 0.3s",
};

const createPackagesStyle = {
  ...buttonStyle,
  backgroundColor: "#f39c12", // Orange color
};

const myPackagesStyle = {
  ...buttonStyle,
  backgroundColor: "#456dff", // Green color
};

export default LenderDashboard;
