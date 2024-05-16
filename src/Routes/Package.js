import React, { useState } from "react";
import LendNavbar from "../Components/LenderNavbar";
import {
  Box,
  Typography,
  TextField,
  Slider,
  Button,
  Grid,
  Card,
  CardContent,
  Container,
  Stack,
  Divider,
} from "@mui/material";
import Web3 from "web3";
import abi from "../abi_LenderPackages.json"; // Replace with the actual path to your ABI file
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";

function Package() {
  const [errorOpen, setErrorOpen] = useState(false);

  const [bankAmount, setBankAmount] = useState(100000); // Default bank amount
  const [loanAmount, setLoanAmount] = useState(5000); // Default loan amount
  const [interest, setInterest] = useState(10); // Default interest rate
  const [timeToReturn, setTimeToReturn] = useState(30); // Default time to return
  const [description, setDescription] = useState("");
  const [penalty, setPenalty] = useState(5); // Default penalty percent

  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const handleBankAmountChange = (event) => {
    setBankAmount(event.target.value);
  };

  const handleLoanAmountChange = (event) => {
    setLoanAmount(event.target.value);
  };

  const handleInterestChange = (event) => {
    setInterest(event.target.value);
  };

  const handleTimeToReturnChange = (event, newValue) => {
    setTimeToReturn(newValue);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePenaltyChange = (event) => {
    setPenalty(event.target.value);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setErrorOpen(false);
  };

  const handleSubmit = async () => {
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
    // Handle submission logic here, e.g., send data to backend
    if (!isConnected) {
      setError("Please connect to MetaMask first.");
      return;
    }

    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      abi,
      "0x7Dbd74b7b487c0E1341D6743C54bD8A5c4c03A99"
    ); // Replace with your contract address
    try {
      console.log("AHAHA");
      const tx = await contract.methods
        .createLoanPackage(
          bankAmount,
          loanAmount,
          interest,
          timeToReturn,
          description,
          penalty
        )
        .send({ from: account, value: bankAmount });

      console.log(
        "Transaction hash:",
        web3.eth.abi.decodeLog(abi, tx.logs.data, tx.logs.topics)
      );
      setOpen(true);
      // Handle successful transaction (e.g., display confirmation message)
    } catch (error) {
      setErrorOpen(true); // Show the error toast

      console.error("Error calling smart contract:", error);
      // Handle errors (e.g., display error message to user)
    }
    console.log("Form submitted");
    // Show the toast
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
      <LendNavbar />
      <Container maxWidth="md">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 4,
          }}
        >
          {error && (
            <Typography color="error">
              {/* Display only the error message */}
              {error.message}
            </Typography>
          )}
          <div style={{ fontFamily: "ubuntu" }}>
            <Typography
              variant="h4"
              gutterBottom
              style={{ fontFamily: "Ubuntu, sans-serif" }}
            >
              Create Loan Package
            </Typography>
          </div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Total Bank Amount"
                type="number"
                value={bankAmount}
                onChange={handleBankAmountChange}
                fullWidth
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Loan Amount per Loan"
                type="number"
                value={loanAmount}
                onChange={handleLoanAmountChange}
                fullWidth
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Interest Rate (%)"
                type="number"
                value={interest}
                onChange={handleInterestChange}
                fullWidth
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom>Time to Return (Days)</Typography>
              <Slider
                value={timeToReturn}
                onChange={handleTimeToReturnChange}
                min={1}
                max={365}
                valueLabelDisplay="auto"
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Penalty Percent (%)"
                type="number"
                value={penalty}
                onChange={handlePenaltyChange}
                fullWidth
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                value={description}
                onChange={handleDescriptionChange}
                fullWidth
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={handleSubmit}
              >
                Create Package
              </Button>
            </Grid>
          </Grid>
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              By clicking "Create Package", you agree to our terms and
              conditions.
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Package;
