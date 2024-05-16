// pages/LoanRepayment.js
import DashCard from "../Components/DashCard";
import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Suggest from "../Components/SuggestedLoan";

const LoanSelection = () => {
  const [loan, setLoan] = useState({
    id: 1,
    amount: 1000,
    term: 12,
    interestRate: 30,
    desc1:
      "Acquired a loan with a 12-month term and a fixed 30% annual interest rate, optimizing short-term capital needs while carefully managing financial costs. The structured repayment plan ensures financial stability and aligns with the company's fiscal objectives.",
    desc2:
      "Acquired a loan with a 12-month term and a fixed 30% annual interest rate, optimizing short-term capital needs while carefully managing financial costs. The structured repayment plan ensures financial stability and aligns with the company's fiscal objectives.",
    desc3:
      "Acquired a loan with a 12-month term and a fixed 30% annual interest rate, optimizing short-term capital needs while carefully managing financial costs. The structured repayment plan ensures financial stability and aligns with the company's fiscal objectives.",
  });

  const handleSelection = () => {
    console.log(`Loan with ID ${loan.id} repaid.`);
    // You can update state or make API calls for actual repayment process
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "20px",
        }}
      >
        <div style={{ flex: 1 }}>
          <h1
            style={{
              fontFamily: "Ubuntu, sans-serif",
              fontSize: "2.5rem",
              fontWeight: "bold",
              marginBottom: "20px",
              color: "#055C9D", // Dark grey color
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)", // Adds a subtle shadow
            }}
          >
            Loan Details
          </h1>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              borderBottom: "1px solid #ccc",
              padding: "10px 0",
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: "1.2rem",
                  fontFamily: "Ubuntu, sans-serif",
                }}
              >
                Loan Selection:
              </h1>

              <p style={{ marginBottom: "1vh" }}>Term #1: {loan.desc1}</p>

              <p style={{ marginBottom: "1vh" }}>Term #2: {loan.desc2}</p>
              <p style={{ marginBottom: "1vh" }}>Term #3: {loan.desc3}</p>
            </div>
            <button
              style={{
                marginTop: "10px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={handleSelection}
            >
              Select
            </button>
          </div>
        </div>
        <div style={{ marginLeft: "20px" }}>
          <div style={{ marginLeft: "-2vw", marginTop: "16vh" }}>
            <DashCard />
          </div>
          <div
            style={{
              marginTop: "1vh",
              backgroundColor: "#f8f9fa",
              padding: "10px",
              borderRadius: "4px",
            }}
          >
            <strong>Total Amount:</strong> ${loan.amount}
          </div>
        </div>
      </div>
      <Suggest />
    </>
  );
};

export default LoanSelection;
