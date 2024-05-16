// pages/LoanInfo.js
import LendDashCard from "../Components/LenderDashCard";
import React, { useEffect, useState } from "react";
import LendNavbar from "../Components/LenderNavbar";
import Suggest from "../Components/SuggestedLoan";
import Web3 from "web3";
import abi from "../abi_CustomPackages.json"; // Replace with the actual path to your ABI file
import { useParams } from "react-router-dom";
import abi_auth from "../abi_auth.json"; // Replace with the actual path to your ABI file
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";
const LoanInfo = () => {
  const { loanId } = useParams(); // Access loanId from URL params
  const [userInfo, setUserInfo] = useState({});
  const [errorOpen, setErrorOpen] = useState(false);

  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setErrorOpen(false);
  };
  const [loan, setLoan] = useState({
    id: 0,
    amount: 0,
    term: 0,
    interestRate: 0,
    desc1: "",
    repaymentDueDate: 0,
    penalty: 0,
  });
  const [suggdata, setData] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);
  const [otherUserWallet, setOtherUserWallet] = useState("");
  useEffect(() => {
    fetchData();

    getUserInfo();
  }, [loanId]); // Trigger fetch on loanId change

  useEffect(() => {

    getUserInfo();
  }, [otherUserWallet]); // Trigger fetch on loanId change

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
      const tx = await contract.methods.getLoanDetails(loanId).call();
      console.log(tx);
      setLoan({
        id: loanId,
        amount: parseInt(tx.amount),
        term: tx.repaymentTerm,
        interestRate: parseInt(tx.interestRate),
        desc1: tx.description,
        penalty: parseInt(tx.penaltyRate),
        repaymentDueDate: parseInt(tx.repaymentDueDate),
      });
      console.log("Transaction hash:", tx);
      setOtherUserWallet(tx.borrower);
      // Handle successful transaction (e.g., display confirmation message)
    } catch (error) {
      console.error("Error calling smart contract:", error);
      // Handle errors (e.g., display error message to user)
    }
  };
  async function getUserInfo() {
    const wallet = localStorage.getItem("account");
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      abi_auth,
      "0xE297247210B0416A3BC72e49730aC24D33838C28"
    ); // Replace with your contract address
    try {
      console.log("user");
      console.log(otherUserWallet);
      const userData = await contract.methods
        .getUserInfo(otherUserWallet)
        .call();
      setUserInfo(userData);
      console.log(userData);
    } catch (err) {}
  }
  const handleInvestInLoan = async () => {
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
      console.log(loan.amount.toString());
      const tx = await contract.methods
        .investInLoan(loanId)
        .send({ from: account, value: loan.amount });

      console.log("Transaction hash:", tx.transactionHash);
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
  let currentDate = new Date();

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
      <LendNavbar />
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
            Custom Loan #{loanId}
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
              <p style={{ marginBottom: "1vh" }}>Loan Amount: ${loan.amount}</p>

              <p style={{ marginBottom: "1vh" }}>
                Interest rate: {parseInt(loan.interestRate)}%
              </p>
              <p style={{ marginBottom: "1vh" }}>
                Penalty rate: {parseInt(loan.penalty)}%
              </p>

              <p style={{ marginBottom: "1vh" }}>
                Return in: {parseInt(loan.term)} days
              </p>

              <p style={{ marginBottom: "1vh" }}>
                Repayment Due: { new Date(currentDate.setDate(currentDate.getDate()+Math.ceil(parseInt(loan.term)))).toLocaleString()}
              </p>

              {/*               <p style={{ marginBottom: "1vh" }}>Term #2: {loan.desc2}</p>
              <p style={{ marginBottom: "1vh" }}>Term #3: {loan.desc3}</p> */}
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
              onClick={handleInvestInLoan}
            >
              Invest in Loan
            </button>
          </div>
        </div>
        <div style={{ marginLeft: "20px" }}>
          <LendDashCard
            Name={userInfo[0]}
            Role={userInfo[1]}
            Email={userInfo[2]}
          />
          <div
            style={{
              marginTop: "1vh",
              backgroundColor: "#f8f9fa",
              padding: "10px",
              borderRadius: "4px",
            }}
          >
            <strong>
              Amount Recievable: $
              {loan.amount + (loan.amount * loan.interestRate) / 100}
            </strong>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "70vw",

          margin: "auto",
        }}
      ></div>
    </>
  );
};

export default LoanInfo;
