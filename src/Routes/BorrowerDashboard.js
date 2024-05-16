import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import BorrowerCard from "../Components/BorrowerCard";
import DashCard from "../Components/DashCard";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { Pagination, Box } from "@mui/material";

import Web3 from "web3";
import abi from "../abi_auth.json"; // Replace with the actual path to your ABI file
import abi_packages from "../abi_LenderPackages.json";

const BorrowerDashboard = () => {
  const [packages, setPackages] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [loanDetails, setLoanDetails] = useState({});
  const [page, setPage] = React.useState(1); // Current page number
  const itemsPerPage = 3; // Number of packages per page (adjust as needed)
  const [userWallet, setUserWallet] = useState("");
  const [isLoading, setIsLoading] = useState(true); // State for loading indicator

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const displayedPackages = packages.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(
          "http://localhost:3002/packages/borrower/all"
        ); // Replace with your API endpoint URL
        const data = await response.json();
        setPackages(data.results);
        setIsLoading(false); // Turn off loading indicator after data is fetched
        console.log(data.results);
        packages.map((packageData) => {
          console.log(packageData);
        });
      } catch (error) {
        console.error("Error fetching packages:", error);
        setIsLoading(false); // Turn off loading indicator if there's an error
      }
    };

    fetchPackages();
  }, []);

  async function getUserInfo() {
    const wallet = localStorage.getItem("account");
    setUserWallet(wallet);
    const web3 = new Web3(window.ethereum);
    const contract1 = new web3.eth.Contract(
      abi,
      "0xE297247210B0416A3BC72e49730aC24D33838C28"
    ); // Replace with your contract address
    try {
      console.log("AHAHA");
      const userData = await contract1.methods.getUserInfo(wallet).call();
      setUserInfo(userData);
      console.log(userData);

      const contract2 = new web3.eth.Contract(
        abi_packages,
        "0x7Dbd74b7b487c0E1341D6743C54bD8A5c4c03A99"
      ); // Replace with your contract address
        console.log("AHAHA");
        const userLoanData = await contract2.methods.users(wallet).call();
        setLoanDetails(userLoanData);
        console.log(userLoanData);
    } catch (err) {}
  }

  useEffect(() => {
    // Fetch data from API
    getUserInfo();
  }, []);

  return (
    <div>
      <Navbar />
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
                  <CircularProgress />{" "}
                  {/* Example using Material-UI's CircularProgress */}
                </div>
              </div>
            </div>
          ) : packages.length === 0 ? ( // Show message if no packages available
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
              <h1>No packages available</h1>
            </center>            {/* Example using Material-UI's CircularProgress */}
          </div>
        </div>
            
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {displayedPackages.map((packageData) => (
                <Link to={"/loaninfo/" + packageData.id} key={packageData.id}>
                  <BorrowerCard
                    Returntime={packageData.timeToReturn}
                    date={packageData.startTime}
                    user={packageData.packageOwner}
                    des={packageData.description}
                    BankAmmount={packageData.bankAmount}
                    loanamm={packageData.loanAmount}
                    desc={packageData.description}
                    Interest={packageData.interest}
                    Active={packageData.active}
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
              <DashCard
                Name={userInfo[0]}
                Role={userInfo[1]}
                Email={userInfo[2]}
                Credit={userInfo[3]}
                LoanLimit={userInfo[4]}
                LActive={loanDetails.active}
                wallet={userWallet}
                loanid = {loanDetails.loanId}
                
              />
              <div style={{}}>
                <Button
                  href="/customLoan"
                  variant="contained"
                  color="primary"
                  style={{
                    marginTop: "2vh",
                    width: "100%",
                    height: "10vh",
                  }}
                >
                  Create Custom Loan
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BorrowerDashboard;
