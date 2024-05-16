import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Web3 from "web3";
import abi from "../abi_LenderPackages.json"; // Replace with the actual path to your ABI file
import { useEffect, useState } from "react";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard(props) {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);

  const [expanded, setExpanded] = React.useState(false);
  const [openWithdrawDialog, setOpenWithdrawDialog] = React.useState(false);
  const [openChangeStatusDialog, setOpenChangeStatusDialog] =
    React.useState(false);
  const [openDepositDialog, setOpenDepositDialog] = React.useState(false);
  const [statusId, setStatusId] = React.useState(props.id); // State to hold the ID for changing status
  const [status, setStatus] = React.useState("true");
  const [withdrawAmount, setWithdrawAmount] = React.useState(0);
  const [depositAmount, setDepositAmount] = React.useState(0);

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
        } catch (error) {}
      } else {
        console.error("MetaMask is not installed!");
      }
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  const handleChangeStatus = async () => {
    console.log("Fetching");
    if (!isConnected) {
      handleConnectWallet();
    }
    console.log(account);
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      abi,
      "0x7Dbd74b7b487c0E1341D6743C54bD8A5c4c03A99"
    ); // Replace with your contract address
    try {
      if (status.toLowerCase() == "false") {
        const tx = await contract.methods
          .togglePackageActive(statusId, false)
          .send({ from: account });

        console.log("Transaction hash:", tx.transactionHash);
      } else if (status.toLowerCase() == "true") {
        const tx = await contract.methods
          .togglePackageActive(statusId, true)
          .send({ from: account });

        console.log("Transaction hash:", tx.transactionHash);
      }

      // Handle successful transaction (e.g., display confirmation message)
    } catch (error) {
      console.error("Error calling smart contract:", error);
      // Handle errors (e.g., display error message to user)
    }
    console.log(`Loan with ID ${statusId} changed status.`);

    // You can update state or make API calls for actual repayment process
  };

  const handleWithdraw = async () => {
    console.log("Fetching");
    if (!isConnected) {
      handleConnectWallet();
    }
    console.log(account);
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      abi,
      "0x7Dbd74b7b487c0E1341D6743C54bD8A5c4c03A99"
    ); // Replace with your contract address
    try {
      const tx = await contract.methods
        .withdrawFromBank(statusId, withdrawAmount)
        .send({ from: account });

      console.log("Transaction hash:", tx.transactionHash);

      // Handle successful transaction (e.g., display confirmation message)
    } catch (error) {
      console.error("Error calling smart contract:", error);
      // Handle errors (e.g., display error message to user)
    }
    console.log(`Loan with ID ${statusId} changed status.`);

    // You can update state or make API calls for actual repayment process
  };

  const handleDesposit = async () => {
    console.log("Fetching");
    if (!isConnected) {
      handleConnectWallet();
    }
    console.log(account);
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      abi,
      "0x7Dbd74b7b487c0E1341D6743C54bD8A5c4c03A99"
    ); // Replace with your contract address
    try {
      const tx = await contract.methods
        .depositToBank(statusId)
        .send({ from: account, value: depositAmount });

      console.log("Transaction hash:", tx.transactionHash);

      // Handle successful transaction (e.g., display confirmation message)
    } catch (error) {
      console.error("Error calling smart contract:", error);
      // Handle errors (e.g., display error message to user)
    }
    console.log(`Loan with ID ${statusId} changed status.`);

    // You can update state or make API calls for actual repayment process
  };

  useEffect(() => {
    handleConnectWallet();
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleWithdrawClick = () => {
    setOpenWithdrawDialog(true);
  };

  const handleCloseWithdrawDialog = () => {
    setOpenWithdrawDialog(false);
  };

  const handleConfirmWithdrawDialog = async () => {
    await handleWithdraw();
    setOpenWithdrawDialog(false);
  };

  const handleChangeStatusClick = () => {
    setOpenChangeStatusDialog(true);
  };

  const handleCloseChangeStatusDialog = () => {
    setOpenChangeStatusDialog(false);
  };

  const handleConfirmChangeStatusDialog = async () => {
    console.log(statusId);
    await handleChangeStatus();
    setOpenChangeStatusDialog(false);
  };

  const handleDepositClick = () => {
    setOpenDepositDialog(true);
  };

  const handleCloseDepositDialog = () => {
    setOpenDepositDialog(false);
  };

  const handleConfirmDepositDialog = async () => {
    await handleDesposit();
    setOpenDepositDialog(false);
  };

  return (
    <div>
      <Card
        sx={{ width: "60vw", height: "30vh" }}
        style={{ marginTop: "1.5vh" }}
      >
        {props.active === true ? (
          <div style={{ backgroundColor: "green", height: "2vh" }}></div>
        ) : (
          <div style={{ backgroundColor: "blue", height: "2vh" }}></div>
        )}
        <CardHeader
          title={props.user}
          subheader={new Date(props.repaymentDueDate * 1000).toLocaleDateString()}
        />

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Interest: {props.interest}
            <br />
            Loan Amount: {props.loanAmount}
            <br />
            Return Time: {props.timeToReturn} Days
            <br />
          </Typography>
          <br />

          
        </CardContent>

      
        
      </Card>
    </div>
  );
}
