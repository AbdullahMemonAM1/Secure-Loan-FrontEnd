import React, { useState, useEffect } from "react";
import Web3 from "web3";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import but from "../images/logo.png";
import abi from "../abi_auth.json"; // Replace with the actual path to your ABI file

export default function SignInSide() {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    connectWalletFunction();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isConnected) {
      setError("Please connect to MetaMask first.");
      return;
    }

    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      abi,
      "0xE297247210B0416A3BC72e49730aC24D33838C28"
    ); // Replace with your contract address
    try {
      console.log("AHAHA");
      const tokenOfOwnerByIndex = await contract.methods
        .tokenOfOwnerByIndex(account, 0)
        .call();
      const tokenID = tokenOfOwnerByIndex.toString();
      console.log(tokenID);
      const tokenURI = await contract.methods
        .tokenURI(parseInt(tokenID))
        .call();
      console.log(account);

      const queryString = tokenURI;
      console.log(queryString);
      // Split the string into an array of key-value pairs
      const pairs = queryString.slice(1).split("&");

      // Initialize an empty object to store the extracted values
      const extractedValues = {};

      // Loop through each key-value pair
      pairs.forEach((pair) => {
        // Split the pair into key and value
        const [key, value] = pair.split("=");
        // Add the key-value pair to the extractedValues object
        extractedValues[key] = decodeURIComponent(value.replace(/\+/g, " "));
      });

      console.log(account);

      localStorage.setItem("loginToken", tokenURI);
      localStorage.setItem("user", JSON.stringify(extractedValues));
      localStorage.setItem("account", account);
      window.open("/", "_self");

      // Handle successful transaction (e.g., display confirmation message)
    } catch (error) {
      console.error("Error calling smart contract:", error);
      // Handle errors (e.g., display error message to user)
    }

    /*     // Proceed with sign-in logic using the connected account
    const email = new FormData(event.currentTarget).get("email");
    const password = new FormData(event.currentTarget).get("password");
    try {
      // ... (implement your sign-in logic here using web3.js)
    } catch (error) {
      console.error("Sign-in error:", error);
      setError("Sign-in failed. Please check your credentials and try again.");
    } */
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
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <img style={{ width: "30vw" }} src={but} alt="" />
      <Box sx={{}}>
        {error && (
          <Typography color="error">
            {/* Display only the error message */}
            {error.message}
          </Typography>
        )}{" "}
        <Grid container>
          <Grid
            item
            style={{ width: "30vw", marginLeft: "2vw" }}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,

                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
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
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container></Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );

  async function connectWalletFunction() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        setIsConnected(true);
      } catch (error) {
        setError(error);
      }
    } else {
      console.error("MetaMask is not installed!");
      setError("MetaMask is not installed. Please install it to continue.");
    }
  }
}
