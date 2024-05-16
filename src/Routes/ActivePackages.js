import React, { useEffect, useState } from "react";
import LendNavbar from "../Components/LenderNavbar";
import PackageCard from "../Components/PackageCard";
import CircularProgress from "@mui/material/CircularProgress";

const LoanHistory = () => {
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State to track loading status

  useEffect(() => {
    // Fetch data from the API
    fetchData();
  }, []); // Empty dependency array to run effect only once on component mount

  async function fetchData() {
    const wallet = localStorage.getItem("account");
    console.log(wallet);

    fetch(`http://localhost:3002/packages/active/lender/specific/${wallet}`) // Replace "status" with the desired parameter
      .then((response) => response.json())
      .then((data) => {
        console.log(data.results);
        // Update state with fetched data
        setPackages(data.results);
        setIsLoading(false); // Update loading state once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Update loading state in case of error
      });
  }

  return (
    <div>
      <LendNavbar />
      <div style={{ margin: "auto", width: "70%" }}>
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh",
              minWidth: "80vw",
            }}
          >
            <CircularProgress style={{ display: "block", margin: "auto" }} />
          </div>
        ) : (
          packages &&
          packages.map((packageData) => (
            <PackageCard
              key={packageData.id} // Added key prop for mapping
              id={packageData.id}
              Active={packageData.active}
              user={packageData.packageOwner}
              startTime={packageData.startTime}
              timeToReturn={packageData.timeToReturn}
              loanAmount={packageData.loanAmount}
              interest={packageData.interest}
              bankAmount={packageData.bankAmount}
            />
          ))
        )}
      </div>
    </div>
  );
};
export default LoanHistory;
