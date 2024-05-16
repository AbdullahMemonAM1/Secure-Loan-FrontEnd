import React, { useState } from "react";
import Navbar from "../Components/Navbar";
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
import abi from "../abi_CustomPackages.json"; // Replace with the actual path to your ABI file
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";

function LoanPage() {
  const [loanAmount, setLoanAmount] = useState(10000);
  const [term, setTerm] = useState(12);
  const [interestRate, setInterestRate] = useState(5);
  const [description, setDescription] = useState(""); // New field for description
  const [penaltyPercent, setPenaltyPercent] = useState(2); // New field for penalty percent
  const [errorOpen, setErrorOpen] = useState(false);

  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setErrorOpen(false);
  };
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);

  const handleAmountChange = (event) => {
    setLoanAmount(event.target.value);
  };

  const handleTermChange = (event, newValue) => {
    setTerm(newValue);
  };

  const handleInterestRateChange = (event) => {
    setInterestRate(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePenaltyPercentChange = (event) => {
    setPenaltyPercent(event.target.value);
  };

  const calculateMonthlyPayment = () => {
    const monthlyInterestRate = interestRate / 100 / 12;
    const totalPayments = term;
    return (
      (loanAmount * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -totalPayments))
    );
  };
  const calculateTotalPayableAmount = () => {
    const monthlyInterestRate = interestRate / 100 / 12;
    const totalPayments = term;
    const monthlyPayment =
      (loanAmount * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -totalPayments));
    return monthlyPayment * totalPayments;
  };

  const handleCreateLoan = async () => {
    console.log("HI");
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
      "0x189f8828Aa06B3B3FdB288D94956ED8A1e33e4E3"
    ); // Replace with your contract address
    try {
      console.log("AHAHA");

      const tx = await contract.methods
        .createLoan(loanAmount, interestRate, term, description, penaltyPercent)
        .send({ from: account });

      console.log("Transaction hash:", tx.transactionHash);
      // Handle successful transaction (e.g., display confirmation message)
      setOpen(true);
    } catch (error) {
      console.error("Error calling smart contract:", error);
      setErrorOpen(true); // Show the error toast

      // Handle errors (e.g., display error message to user)
    }
    console.log("Form submitted");
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
      <Container maxWidth="md">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 4,
          }}
        >
          <div style={{ fontFamily: "ubuntu" }}>
            <Typography
              variant="h4"
              gutterBottom
              style={{ fontFamily: "Ubuntu, sans-serif" }}
            >
              Create A Custom Loan Today!
            </Typography>
          </div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Loan Amount"
                type="number"
                value={loanAmount}
                onChange={handleAmountChange}
                fullWidth
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Preferred Interest Rate (%)"
                type="number"
                value={interestRate}
                onChange={handleInterestRateChange}
                fullWidth
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom>Loan Term (Days)</Typography>
              <Slider
                value={term}
                onChange={handleTermChange}
                min={1}
                max={150}
                valueLabelDisplay="auto"
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                value={description}
                onChange={handleDescriptionChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Penalty Percent (%)"
                type="number"
                value={penaltyPercent}
                onChange={handlePenaltyPercentChange}
                fullWidth
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <Card sx={{ mb: 2 }}>
                <CardContent>
                  <Stack spacing={2}>
                    {/* <Typography variant="h6">
                      Monthly Payment Estimate:
                    </Typography>
                    <Typography variant="body1">
                      ${calculateMonthlyPayment().toFixed(2)}
                    </Typography> */}
                    <Typography variant="h6">
                      Total Payment Estimate:
                    </Typography>
                    <Typography variant="body1">
                      ${calculateTotalPayableAmount().toFixed(2)}
                    </Typography>

                    <Divider />
                    <Typography variant="body2" color="text.secondary">
                      APR (Annual Percentage Rate): {interestRate}% (example)
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={handleCreateLoan}
                size="large"
                fullWidth
              >
                Create
              </Button>
            </Grid>
          </Grid>
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              By clicking "Create", you agree to our terms and conditions.
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default LoanPage;
