import React, { useEffect, useState } from "react";
import LendNavbar from "../Components/LenderNavbar";
import LoanCard from "../Components/LoanCard";
import PackageCard from "../Components/PackageCard";
import CustomPackageCard from "../Components/customPackageCard";

import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress from Material-UI

const MyPackage = () => {
  const [packages, setPackages] = useState([]);
  const [customPackages, setCustomPackages] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status
  const [loadingCustom, setLoadingCustom] = useState(true); // State to track loading status

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const wallet = localStorage.getItem("account");
    fetch(`http://localhost:3002/packages/lender/specific/${wallet}`)
      .then((response) => response.json())
      .then((data) => {
        setPackages(data.results);
        console.log(data.results);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => console.error("Error fetching data:", error));

      fetch(`http://localhost:3002/packages/lender/custom/specific/${wallet}`)
      .then((response) => response.json())
      .then((data) => {
        setCustomPackages(data.results);
        console.log(data.results);
        setLoadingCustom(false);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  return (
    <div>
      <LendNavbar />
      <div style={{ margin: "auto", width: "70%" }}>
      <br></br>
        <h1>My Packages:</h1>
        {loading ? ( // Render CircularProgress if loading is true
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh",
              minWidth: "80vw",
            }}
          >
            <CircularProgress
              style={{ margin: "20px auto", display: "block" }}
            />
          </div>
        ) : (
          packages &&
          packages.map((packageData) => (
            <PackageCard
              key={packageData.id} // Add key prop for unique identification
              id={packageData.id}
              active={packageData.active}
              user={packageData.packageOwner}
              startTime={packageData.startTime}
              timeToReturn={packageData.timeToReturn}
              loanAmount={packageData.loanAmount}
              interest={packageData.interest}
              bankAmount={packageData.bankAmount}
            />
          ))
        )}
        <br></br>
        <h1>Custom Loans Invested In:</h1>
        {loadingCustom ? ( // Render CircularProgress if loading is true
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh",
              minWidth: "80vw",
            }}
          >
            <CircularProgress
              style={{ margin: "20px auto", display: "block" }}
            />
          </div>
        ) : (
          customPackages &&
          customPackages.map((packageData) => (
            <CustomPackageCard
              key={packageData.id} // Add key prop for unique identification
              id={packageData.id}
              active={packageData.isActive}
              user={packageData.borrower}
              repaymentDueDate={packageData.repaymentDueDate}
              timeToReturn={packageData.repaymentTerm}
              loanAmount={packageData.amount}
              interest={packageData.interestRate}
              bankAmount={packageData.bankAmount}
            />
          ))
        )}
      </div>
      <br></br>
      <br></br>

    </div>
  );
};

export default MyPackage;
