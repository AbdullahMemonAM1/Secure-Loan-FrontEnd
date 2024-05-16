// pages/LoanInfo.js
import DashCard from "../Components/DashCard";
import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Suggest from "../Components/SuggestedLoan";
import Web3 from "web3";
import abi from "../abi_LenderPackages.json"; // Replace with the actual path to your ABI file
import { useParams } from "react-router-dom";
import abi_auth from "../abi_auth.json"; // Replace with the actual path to your ABI file
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";
const LoanRepayment = () => {
  const { loanId } = useParams(); // Access loanId from URL params
  const [userInfo, setUserInfo] = useState({});

  const [loan, setLoan] = useState({
    id: 1,
    amount: 1000,
    term: 12,
    interestRate: 30,
    desc1: "",
    active: false,
    penalty: 0,
  });
  const [errorOpen, setErrorOpen] = useState(false);

  const [open, setOpen] = useState(false);

  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  let currentDate = new Date();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setErrorOpen(false);
  };
  async function getUserInfo() {
    const wallet = localStorage.getItem("account");
    setAccount(wallet);
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      abi_auth,
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
    getUserInfo();
  }, []);
  const fetchData = async () => {
    console.log("Fetching");
    if (!isConnected) {
      handleConnectWallet();
    }

    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      abi,
      "0x7Dbd74b7b487c0E1341D6743C54bD8A5c4c03A99"
    ); // Replace with your contract address
    try {
      console.log(loanId.valueOf());
      const tx = await contract.methods.loanPackages(loanId).call();
      setLoan({
        id: loanId,
        amount: parseInt(tx.loanAmount),
        term: tx.timeToReturn,
        interestRate: tx.interest,
        desc1: tx.description,
        active: tx.active,
        penalty: tx.penaltyRate,
      });
      setIsButtonDisabled(tx[5]);
      console.log("Transaction hash:", tx);
      // Handle successful transaction (e.g., display confirmation message)
    } catch (error) {
      console.error("Error calling smart contract:", error);
      // Handle errors (e.g., display error message to user)
    }
  };
  useEffect(() => {
    fetchData();
  }, [loanId]); // Trigger fetch on loanId change

  const handleRepayLoan = async () => {
    if (!isConnected) {
      handleConnectWallet();
    }

    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      abi,
      "0x7Dbd74b7b487c0E1341D6743C54bD8A5c4c03A99"
    ); // Replace with your contract address
    try {
      console.log(loanId.valueOf());
      const owedAmount =
        parseInt(loan.amount) +
        (parseInt(loan.amount) * parseInt(loan.interestRate)) / 100;
      const tx = await contract.methods
        .repayLoan(loanId)
        .send({ from: account, value: owedAmount });

      console.log("Transaction hash:", tx);
      setOpen(true);

      // Handle successful transaction (e.g., display confirmation message)
    } catch (error) {
      console.error("Error calling smart contract:", error);
      setErrorOpen(true); // Show the error toast

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
            Loan Package #{loanId}
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
                Due on: {new Date(currentDate.setDate(currentDate.getDate()+Math.ceil(parseInt(loan.term) / (60 * 60 * 24)))).toLocaleString()}
              </p>

              <p style={{ marginBottom: "1vh" }}>{loan.desc1}</p>

              {/*               <p style={{ marginBottom: "1vh" }}>Term #2: {loan.desc2}</p>
              <p style={{ marginBottom: "1vh" }}>Term #3: {loan.desc3}</p> */}
            </div>
            <button
              disabled={!isButtonDisabled}
              style={{
                marginTop: "10px",
                backgroundColor: !isButtonDisabled ? "grey" : "#007bff",
                color: "#fff",
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

        <div style={{ marginLeft: "1vw" }}>
          <DashCard
            Name={userInfo[0]}
            Role={userInfo[1]}
            Email={userInfo[2]}
            Credit={userInfo[3]}
            LoanLimit={userInfo[4]}
            LActive={userInfo[5]}
            wallet={account}
          />

          <div
            style={{
              marginTop: "1vh",
              backgroundColor: "#f8f9fa",
              padding: "10px",
              borderRadius: "4px",
            }}
          >
            <strong>Amount Due:</strong> $
            {loan.amount + (loan.amount * parseInt(loan.interestRate)) / 100}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoanRepayment;
