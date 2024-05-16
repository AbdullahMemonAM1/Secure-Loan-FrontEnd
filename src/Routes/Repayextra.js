import DashCard from "../Components/DashCard";
import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Suggest from "../Components/SuggestedLoan";

const LoanRepayment = () => {
  const [loans, setLoans] = useState([
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
  ]);

  const handleRepayment = (id) => {
    console.log(`Loan with ID ${id} repaid.`);
  };

  // Calculate total loan amount
  const totalAmount = loans.reduce((total, loan) => total + loan.amount, 0);

  // Function to handle total repayment
  const handleTotalRepayment = () => {
    // Repayment logic here
    console.log("All loans repaid.");
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
            Total Loans
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
                  onClick={() => handleRepayment(loan.id)}
                >
                  Repay
                </button>
              </li>
            ))}
          </ul>

          <button
            style={{
              marginTop: "5vh",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={handleTotalRepayment}
          >
            Repay All Loans
          </button>
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
            <strong>Total Amount:</strong> ${totalAmount}
          </div>
        </div>
      </div>
      <Suggest />
    </>
  );
};

export default LoanRepayment;
