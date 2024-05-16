// pages/LoanSelection.js

import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import SuggestedLoan from "../Components/SuggestedLoan";
import DashCard from "../Components/DashCard";

const LoanSelection = () => {
  const [selectedLoan, setSelectedLoan] = useState(null);

  const loans = [
    {
      id: 1,
      amount: 1000,
      desc: "Acquired a loan with a 12-month term and a fixed 30% annual interest rate, optimizing short-term capital needs while carefully managing financial costs. The structured repayment plan ensures financial stability and aligns with the company's fiscal objectives.",
    },
    {
      id: 2,
      amount: 2000,
      desc: "Acquired a loan with a 14-month term and a fixed 30% annual interest rate, optimizing short-term capital needs while carefully managing financial costs. The structured repayment plan ensures financial stability and aligns with the company's fiscal objectives.",
    },
    {
      id: 3,
      amount: 3000,
      desc: "Acquired a loan with a 15-month term and a fixed 30% annual interest rate, optimizing short-term capital needs while carefully managing financial costs. The structured repayment plan ensures financial stability and aligns with the company's fiscal objectives.",
    },
  ];

  const handleLoanSelection = (loan) => {};

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
            Select a Loan
          </h1>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {loans.map((loan) => (
              <li
                key={loan.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid #ccc",
                  padding: "10px 0",
                }}
              >
                <span>
                  <h1
                    style={{
                      fontSize: "1.2rem",
                      fontFamily: "Ubuntu, sans-serif",
                    }}
                  >
                    Loan #{loan.id}:
                  </h1>
                  ${loan.amount} {loan.desc}
                </span>
                <button
                  style={{
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleLoanSelection(loan)}
                >
                  Select
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ marginLeft: "20px" }}>
          <div style={{ marginLeft: "-2vw", marginTop: "16vh" }}>
            <DashCard />
          </div>
          {selectedLoan && (
            <div
              style={{
                marginTop: "1vh",
                backgroundColor: "#f8f9fa",
                padding: "10px",
                borderRadius: "4px",
              }}
            >
              <strong>Selected Loan:</strong> <br />
              Loan #{selectedLoan.id}: ${selectedLoan.amount}{" "}
              {selectedLoan.desc}
            </div>
          )}
        </div>
      </div>
      <SuggestedLoan />
    </>
  );
};

export default LoanSelection;
