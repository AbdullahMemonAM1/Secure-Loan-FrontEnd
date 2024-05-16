import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import LoanCard from "../Components/LoanCard";
import LoanCarde from "../Components/LoanCarde";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";

const LoanHistory = () => {
  const wallet = localStorage.getItem("account");
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [isLoadingCustomLoans, setIsLoadingCustomLoans] = useState(true);
  const [CustomLoans, setCustomLoans] = useState(null);
  const [Hisdata, setData] = useState(null);

  const fetchData = async () => {
    try {
      const historyResponse = await fetch(
        `http://localhost:3002/user/borrower/history/${wallet}`
      );
      const historyData = await historyResponse.json();
      setData(historyData.results);
      console.log(historyData.results);
    } catch (error) {
      console.error("Error fetching loan history:", error);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const fetchCustomLoans = async () => {
    try {
      const customLoansResponse = await fetch(
        `http://localhost:3002/user/borrower/customloans/${wallet}`
      );
      const customLoansData = await customLoansResponse.json();
      setCustomLoans(customLoansData.results);
      console.log(customLoansData.results);
    } catch (error) {
      console.error("Error fetching custom loans:", error);
    } finally {
      setIsLoadingCustomLoans(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchCustomLoans();
  }, [wallet]);

  return (
    <div>
      <Navbar />
      <br />

      <div style={{ margin: "auto", width: "70%" }}>
        <h1>Custom Loans</h1>
        {isLoadingCustomLoans ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "10vh",
            }}
          >
            <CircularProgress />
          </div>
        ) : CustomLoans && CustomLoans.length > 0 ? (
          CustomLoans.map((loan) => (
            <Link
              key={loan.id}
              to={`/custom/repayment/${loan.id}`}
              target="_blank"
            >
              <LoanCard
                id={loan.id}
                loanAmm={loan.amount}
                interest={loan.interestRate}
                det={loan.description}
                active={loan.isActive}
              />
            </Link>
          ))
        ) : (
          <center>
            <br /> <p>No custom loan history available</p>
          </center>
        )}
      </div>
      <br />
      <br />

      <div style={{ margin: "auto", width: "70%" }}>
        <h2>Loan History</h2>
        {isLoadingHistory ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "10vh",
            }}
          >
            <CircularProgress />
          </div>
        ) : Hisdata && Hisdata.length > 0 ? (
          Hisdata.map((loandet) => (
            <Link
              key={loandet.id}
              to={`/repayment/${loandet.id}`}
              target="_blank"
            >
              <LoanCard
                id={loandet.id}
                loanAmm={loandet.loanAmount}
                interest={loandet.interest}
                det={loandet.description}
                active={loandet.active}
              />
            </Link>
          ))
        ) : (
          <center>
            <br /> <p>No loan history available</p>
          </center>
        )}
      </div>
    </div>
  );
};

export default LoanHistory;
