// pages/LoanInfo.js
import DashCard from "../Components/DashCard";
import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Suggest from "../Components/SuggestedLoan";
import Web3 from "web3";
import abi from "../abi_LenderPackages.json"; // Replace with the actual path to your ABI file
import abi_auth from "../abi_auth.json"; // Replace with the actual path to your ABI file
import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";
import CircularProgress from "@mui/material/CircularProgress";

const LoanInfo = () => {
  const { loanId } = useParams(); // Access loanId from URL params
  const [userInfo, setUserInfo] = useState({});
  const [loanOwner, setLoanOwner] = useState("");
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
    desc3: "",
  });

  const [suggdata, setData] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);
  const [otherUserWallet, setOtherUserWallet] = useState("");
  let pkgOwnerWallet;
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
        term: tx[4],
        interestRate: tx.interest,
        desc1: tx.description,
        desc2:
          "Acquired a loan with a 12-month term and a fixed 30% annual interest rate, optimizing short-term capital needs while carefully managing financial costs. The structured repayment plan ensures financial stability and aligns with the company's fiscal objectives.",
        desc3:
          "Acquired a loan with a 12-month term and a fixed 30% annual interest rate, optimizing short-term capital needs while carefully managing financial costs. The structured repayment plan ensures financial stability and aligns with the company's fiscal objectives.",
      });

      setLoanOwner(tx.packageOwner);
      console.log("Transaction hash:", tx);
      pkgOwnerWallet = await contract.methods
        .getLoanPackageOwner(loanId)
        .call();
      console.log(pkgOwnerWallet);
      await setOtherUserWallet(pkgOwnerWallet);

      // Handle successful transaction (e.g., display confirmation message)
    } catch (error) {
      console.error("Error calling smart contract:", error);
      // Handle errors (e.g., display error message to user)
    }
  };
  async function fetchSuggested() {
    const response = await fetch(
      `http://localhost:3002/packages/suggested/${loanId}`
    ); // Replace with your API endpoint URL
    const data = await response.json();

    console.log(data.results);
    setData(data.results);
  }
  async function getUserInfo() {
    const wallet = localStorage.getItem("account");
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      abi_auth,
      "0xE297247210B0416A3BC72e49730aC24D33838C28"
    ); // Replace with your contract address
    try {
      console.log("AHAHA");
      const userData = await contract.methods.getUserInfo(loanOwner).call();
      setUserInfo(userData);
      console.log(userData);
    } catch (err) {}
  }

  async function callData() {
    await getUserInfo();
    await fetchSuggested();
  }

  useEffect(() => {
    fetchData();

    callData();
  }, [loanOwner]); // Trigger fetch on loanId change

  const handleGetLoan = async () => {
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
      const tx = await contract.methods
        .borrowFromPackage(loanId)
        .send({ from: account });

      console.log("Transaction hash:", tx.transactionHash);
      // Handle successful transaction (e.g., display confirmation message)
      setOpen(true);
    } catch (error) {
      console.error("Error calling smart contract:", error);
      // Handle errors (e.g., display error message to user)
      setErrorOpen(true); // Show the error toast
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
      <Navbar />
      <div
        style={{
          display: "flex",
          maxWidth: "80vw",
          margin: "0 auto",
          padding: "20px",
        }}
      >
        <div style={{ flex: 1, maxWidth: "79%" }}>
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
                Due on: { new Date(currentDate.setDate(currentDate.getDate()+Math.ceil(parseInt(loan.term) / (60 * 60 * 24)))).toLocaleString()}
              </p>

              <p style={{ marginBottom: "1vh" }}>{loan.desc1}</p>

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
              onClick={handleGetLoan}
            >
              Get Loan
            </button>
          </div>
          <div style={{ width: "12vw", margin: "auto", marginTop: "2vh" }}>
            <h1
              style={{
                fontSize: "1.5rem",
                fontFamily: "Ubuntu, sans-serif",
              }}
            >
              {" "}
              Suggested Loans{" "}
            </h1>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              width: "70vw",

              margin: "auto",
            }}
          >
            {suggdata ? ( // If data is loaded
              suggdata.map((LoanInfo) => (
                <div key={LoanInfo.id}>
                  
                  {loanId==LoanInfo.id?(<div></div>):(<Suggest
                    id={LoanInfo.id}
                    det={LoanInfo.description}
                    interest={LoanInfo.interest}
                    loanAmm={LoanInfo.loanAmount}
                  />)}
                </div>
              ))
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "40vh",
                  minWidth: "80vw",
                  marginLeft: "-10vw",
                }}
              >
                <CircularProgress />
              </div>
            )}
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
            wallet={loanOwner}
          />

          <div
            style={{
              marginTop: "1vh",
              backgroundColor: "#f8f9fa",
              padding: "10px",
              borderRadius: "4px",
            }}
          >
            <strong>Amount Payable:</strong> $
            {loan.amount + (loan.amount * parseInt(loan.interestRate)) / 100}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoanInfo;
