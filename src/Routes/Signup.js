import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import Navbar from "../Components/Navbar";
import logo from "../images/logo.png";
import Web3 from "web3";
import abi from "../abi_auth.json"; // Replace with the actual path to your ABI file
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";
// @Abdullah
// Things to add; A drop down w two options Borrower or Lender
// Success message
// Phone number

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dateOfBirth: "",
    cnic: "",
    role: "Borrower", // Default role
  });
  const [errorOpen, setErrorOpen] = useState(false);

  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setErrorOpen(false);
  };
  useEffect(() => {
    connectWalletFunction();
  }, []);

  async function connectWalletFunction() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        setIsConnected(true);
      } catch (error) {
        setErrors(error);
      }
    } else {
      console.error("MetaMask is not installed!");
      setErrors("MetaMask is not installed. Please install it to continue.");
    }
  }

  const handleConnectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setIsConnected(true);
        }
      } else {
        console.error("MetaMask is not installed!");
        setErrors("MetaMask is not installed. Please install it to continue.");
      }
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    console.log("role data:", formData.role);

    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.dateOfBirth.trim()) {
      errors.dateOfBirth = "Date of Birth is required";
    }
    if (!formData.cnic.trim()) {
      errors.cnic = "CNIC is required";
    }
    if (Object.keys(errors).length === 0) {
      console.log("Form data:", formData);
      console.log(abi["result"]);
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(
        abi,
        "0xE297247210B0416A3BC72e49730aC24D33838C28"
      ); // Replace with your contract address
      try {
        console.log("AHAHA");
        const tx = await contract.methods
          .mint(
            formData.firstName + " " + formData.lastName,
            formData.cnic,
            formData.dateOfBirth,
            formData.role,
            formData.email,
            "0"
          )
          .send({ from: account });
        console.log("Transaction hash:", tx.transactionHash);
        // Handle successful transaction (e.g., display confirmation message)
        // HEREEEEEEEEEEEEEe @Abdullah
        setOpen(true);

        // Redirect to Sign In page after a suitable delay (consider user experience)
        setTimeout(() => {
          window.location.href = "/signin";
        }, 3000); // Redirect after 3 seconds
      } catch (error) {
        console.error("Error calling smart contract:", error);
        setErrorOpen(true); // Show the error toast
      }
    } else {
      setErrors(errors);
    }
  };

  return (
    <>
      {/* <Navbar />; */}{" "}
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
      <Container
        maxWidth="sm"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // Adjust this value as needed
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{ width: "40%", marginBottom: "20px" }}
        />{" "}
        {/* Image */}
        {/*  <Typography variant="h2" align="center" gutterBottom>
          Secure Loan: A Fraud Resistent Lending Platform
        </Typography> */}
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          style={{ marginBottom: "20px" }}
        >
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                label="First Name"
                variant="outlined"
                fullWidth
                value={formData.firstName}
                onChange={handleChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="lastName"
                label="Last Name"
                variant="outlined"
                fullWidth
                value={formData.lastName}
                onChange={handleChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="cnic"
                label="CNIC"
                variant="outlined"
                fullWidth
                value={formData.cnic}
                onChange={handleChange}
                error={!!errors.cnic}
                helperText={errors.cnic}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                label="Email"
                variant="outlined"
                fullWidth
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="dateOfBirth"
                label="Date of Birth"
                type="date"
                variant="outlined"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={formData.dateOfBirth}
                onChange={handleChange}
                error={!!errors.dateOfBirth}
                helperText={errors.dateOfBirth}
              />
            </Grid>
            <Grid item xs={12}>
              <RadioGroup
                row
                aria-label="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="Borrower"
                  control={<Radio />}
                  label="Borrower"
                />
                <FormControlLabel
                  value="Lender"
                  control={<Radio />}
                  label="Lender"
                />
              </RadioGroup>
            </Grid>
          </Grid>
          {isConnected ? (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 0 }}
              onClick={handleConnectWallet}
            >
              Connected
            </Button>
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 0 }}
              onClick={handleConnectWallet}
            >
              Connect wallet
            </Button>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{ mt: 2 }}
          >
            Sign Up
          </Button>
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            size="large"
            sx={{ mt: 2 }}
            href="/signin"
          >
            Sign In
          </Button>
        </form>
      </Container>
    </>
  );
};

export default SignUpForm;
