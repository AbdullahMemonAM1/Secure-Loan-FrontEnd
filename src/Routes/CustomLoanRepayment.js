// pages/LoanInfo.js
import DashCard from "../Components/DashCard";
import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Suggest from "../Components/SuggestedLoan";
import Web3 from "web3";
import abi from "../abi_CustomPackages.json"; // Replace with the actual path to your ABI file
import abi_auth from "../abi_auth.json"; // Replace with the actual path to your ABI file

import { useParams } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";
const CustomLoanRepayment = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const { loanId } = useParams(); // Access loanId from URL params
  const [dueAmount, setDueAmount] = useState(0); //
  const [userInfo, setUserInfo] = useState({});

  async function getUserInfo() {
    const wallet = localStorage.getItem("account");
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      abi_auth,
      "0xE297247210B0416A3BC72e49730aC24D33838C28"
    ); // Replace with your contract address
    try {
      console.log("AHAHA");
      console.log(loan.lender);
      const userData = await contract.methods.getUserInfo(loan.lender).call();
      setUserInfo(userData);
      console.log(userData);
    } catch (err) {}
  }
  const [loan, setLoan] = useState({
    id: 0,
    amount: 0,
    term: 0,
    dueDate: "",
    interestRate: 0,
    penalty: 0,
    desc1: "",
    active: false,
    lender: "",
  });
  const [errorOpen, setErrorOpen] = useState(false);

  const [open, setOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);
  let currentDate = new Date();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setErrorOpen(false);
  };
  const fetchData = async () => {
    console.log("Fetching");
    if (!isConnected) {
      handleConnectWallet();
    }

    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      abi,
      "0x189f8828Aa06B3B3FdB288D94956ED8A1e33e4E3"
    ); // Replace with your contract address
    try {
      console.log(loanId.valueOf());
      const tx = await contract.methods.loans(loanId).call();
      var owedAmount = 0;
      try {
        owedAmount = await contract.methods.getAmountDue(loanId).call();
        console.log(owedAmount);
        setDueAmount(parseInt(owedAmount));
      } catch {
        console.log(owedAmount);
        owedAmount =
          parseInt(tx.amount) +
          (parseInt(tx.amount) * parseInt(tx.interestRate)) / 100;
        setDueAmount(parseInt(owedAmount));
      }

      await setLoan({
        id: loanId,
        amount: parseInt(tx.amount),
        term: tx.repaymentTerm,
        interestRate: parseInt(tx.interestRate),
        desc1: tx.description,
        dueDate: tx.repaymentDueDate,
        penalty: parseInt(tx.penaltyRate),
        active: tx.isActive,
        lender: tx.lender,
      });
      setIsButtonDisabled(loan.active);
      console.log(isButtonDisabled);

      console.log(loan.penalty);
      console.log("Transaction hash:", tx);
      getUserInfo();

      // Handle successful transaction (e.g., display confirmation message)
    } catch (error) {
      console.error("Error calling smart contract:", error);
      // Handle errors (e.g., display error message to user)
    }
  };

  useEffect(() => {
    fetchData();
  }, [loanId]); // Trigger fetch on loanId change

  useEffect(() => {
    getUserInfo();

  }, [loan]); // Trigger fetch on loanId change

  const handleRepayLoan = async () => {
    if (!isConnected) {
      handleConnectWallet();
    }

    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      abi,
      "0x189f8828Aa06B3B3FdB288D94956ED8A1e33e4E3"
    ); // Replace with your contract address
    try {
      console.log(loanId.valueOf());
      console.log("LOANNNAMOUNT: ");

      const tx = await contract.methods
        .repayLoan(loanId)
        .send({ from: account, value: parseInt(dueAmount) });

      console.log("Transaction hash:", tx);
      // Handle successful transaction (e.g., display confirmation message)
      setOpen(true);
    } catch (error) {
      setErrorOpen(true); // Show the error toast

      console.error("Error calling smart contract:", error);
      // Handle errors (e.g., display error message to user)
    }
    console.log(`Loan with ID ${loan.id} borrowed.`);

    // You can update state or make API calls for actual repayment process
  };

  const handleConnectWallet = async (event) => {
    try {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            setIsConnected(true);
          }
        } catch (error) {
          setError(error);
        }
      } else {
        console.error("MetaMask is not installed!");
        setError("MetaMask is not installed. Please install it to continue.");
      }
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={5000} // Duration for the toast to stay visible
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // Position of the toast
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          <CheckIcon fontSize="inherit" sx={{ mr: 1 }} />
          Your action was successful.
        </Alert>
      </Snackbar>
      <Snackbar
        open={errorOpen}
        autoHideDuration={5000} // Duration for the toast to stay visible
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // Position of the toast
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          <ErrorIcon fontSize="inherit" sx={{ mr: 1 }} />
          An error occurred while processing your request.
        </Alert>
      </Snackbar>
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
            Custom Loan Repayment ID#{loanId}
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
                  fontSize: "1.5rem",
                  fontFamily: "Ubuntu, sans-serif",
                }}
              >
                Loan Details:
              </h1>
              <br />
              <p style={{ marginBottom: "1vh" }}>
                Loan Amount: {loan.amount.toString()}
              </p>

              <p style={{ marginBottom: "1vh" }}>
                Interest rate: {loan.interestRate.toString()}
              </p>
              <p style={{ marginBottom: "1vh" }}>
                Penalty rate: {loan.penalty.toString()}
              </p>

              <p style={{ marginBottom: "1vh" }}>
                Repayment term : {parseInt(loan.term)}
              </p>

              <p style={{ marginBottom: "1vh" }}>
                Due on:{" "}
                {new Date(
                  currentDate.setDate(
                    currentDate.getDate() +
                      Math.ceil(parseInt(loan.term) / (60 * 60 * 24))
                  )
                ).toLocaleString()}{" "}
              </p>

              <p style={{ marginBottom: "1vh" }}>{loan.desc1}</p>

              {/*               <p style={{ marginBottom: "1vh" }}>Term #2: {loan.desc2}</p>
              <p style={{ marginBottom: "1vh" }}>Term #3: {loan.desc3}</p> */}
            </div>
            <button
              // disabled={!isButtonDisabled}
              style={{
                marginTop: "10px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={handleRepayLoan}
            >
              Repay Loan
            </button>
          </div>
        </div>
        <div>
          <div style={{ marginLeft: "1vw", marginTop: "2vh" }}>
            <DashCard
              Name={userInfo[0]}
              Role={userInfo[1]}
              Email={userInfo[2]}
              Credit={userInfo[3]}
              LoanLimit={userInfo[4]}
              LActive={userInfo[5]}
              wallet={loan.lender}
            />
          </div>
          <div
            style={{
              marginTop: "1vh",
              backgroundColor: "#f8f9fa",
              padding: "10px",
              borderRadius: "4px",
            }}
          >
            <strong>Amount Due:</strong> ${dueAmount}
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomLoanRepayment;
