import React, { useEffect, useState } from "react";
import NavBar from "../Components/Navbar";
import ava from "../images/Loan.png";
import { Avatar } from "@mui/material";
import abi from "../abi_auth.json"; // Replace with the actual path to your ABI file
import Web3 from "web3";

import Card2 from "../Components/LoanCard";
const UserProfle = () => {
  const [name, setName] = useState("");
  const [username, setUser] = useState("");
  const [nameAssign, setAssignName] = useState("");
  const [Email, setAssignEmail] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [usernameAssign, setAssignUser] = useState("");
  const [userInfo, setUserInfo] = useState({});

  const [cnic, setCnic] = useState("");
  const [creditScore, setCreditScore] = useState(0); // Added credit score state
  const [userinfo, setuserinfo] = useState(""); // Added credit score state
  async function connectWalletFunction() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        setIsConnected(true);
      } catch (error) {}
    } else {
      console.error("MetaMask is not installed!");
    }
  }
  async function getUserInfo() {
    const wallet = localStorage.getItem("account");
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      abi,
      "0xE297247210B0416A3BC72e49730aC24D33838C28"
    ); // Replace with your contract address
    try {
      console.log("AHAHA");
      const userData = await contract.methods.getUserInfo(wallet).call();
      setUserInfo(userData);
      console.log(userData);
      setAssignEmail(userData[2]);
    } catch (err) {}
  }

  useEffect(() => {
    const thisUser = JSON.parse(localStorage.getItem("user"));
    console.log(thisUser);
    setCnic(thisUser.cnic);
    getUserInfo();

    connectWalletFunction();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isConnected) {
      return;
    }

    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      abi,
      "0xE297247210B0416A3BC72e49730aC24D33838C28"
    ); // Replace with your contract address
    try {
      console.log("AHAHA");
      const tx = await contract.methods
        .updateEmail(Email)
        .send({ from: account });

      console.log(account);

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
        } catch (error) {}
      } else {
        console.error("MetaMask is not installed!");
      }
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  return (
    <>
      <NavBar />
      <div
        style={{
          display: "flex",
          marginTop: "5vh",
          marginLeft: "3vw",
          justifyContent: "center",
        }}
      >
        <Avatar
          style={{ height: "25vh", width: "15vw" }}
          alt="Remy Sharp"
          src={
            "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
          }
        />

        {/*         <div style={{ marginLeft: "15vw" }}>
          <h1 style={{ fontSize: "2rem" }}>{name}</h1>
          <h2 style={{ fontSize: "1.2rem", fontFamily: "Ubuntu, sans-serif" }}>
            {name}
          </h2>
          <h2 style={{ fontSize: "1.2rem", fontFamily: "Ubuntu, sans-serif" }}>
            {username}
          </h2>
          <h2>Credit Score: {creditScore}</h2>
        </div> */}
      </div>
      <hr style={{ marginTop: "1vh" }} />
      <div
        style={{
          marginLeft: "3vw",
          fontSize: "1.3rem",
          marginTop: "1vh",
          fontFamily: "Kanit",
        }}
      >
        <h1 style={{ marginLeft: "5vw" }}>Account</h1>
      </div>
      <hr />
      <div
        style={{
          display: "flex",
        }}
      >
        <div>
          <form onSubmit={handleSubmit} className="mt-10">
            <div
              className="md:flex md:items-center mb-6 "
              style={{ justifyContent: "space-between", marginLeft: "8vw" }}
            >
              <div>
                <label
                  className="block text-gray-500 font-bold md:text-right mb-2 md:mb-0 pr-4"
                  htmlFor="inline-Name"
                >
                  Full Name
                </label>
              </div>
              <div>
                <div
                  readOnly
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-Name"
                  style={{ width: "40vw" }}
                >
                  {userInfo[0]}
                </div>
              </div>
            </div>
            <div
              className="md:flex md:items-center mb-6 "
              style={{ justifyContent: "space-between", marginLeft: "8vw" }}
            >
              <div>
                <label
                  className="block text-gray-500 font-bold md:text-right mb-2 md:mb-0 pr-4"
                  htmlFor="inline-status"
                >
                  Status
                </label>
              </div>
              <div>
                <div
                  readOnly
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-cnic"
                  style={{ width: "40vw" }}
                >
                  {userInfo[1]}
                </div>
              </div>
            </div>
            {/* Credit score field */}
            <div
              className="md:flex md:items-center mb-6 "
              style={{ justifyContent: "space-between", marginLeft: "8vw" }}
            >
              <div>
                <label
                  className="block text-gray-500 font-bold md:text-right mb-2 md:mb-0 pr-4"
                  htmlFor="inline-cnic"
                >
                  Cnic
                </label>
              </div>
              <div>
                <div
                  readOnly
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-cnic"
                  style={{ width: "40vw" }}
                >
                  {cnic}
                </div>
              </div>
            </div>
            <div
              className="md:flex md:items-center mb-6 "
              style={{ justifyContent: "space-between", marginLeft: "8vw" }}
            >
              <div>
                <label
                  className="block text-gray-500 font-bold md:text-right mb-2 md:mb-0 pr-4"
                  htmlFor="inline-email"
                >
                  Email
                </label>
              </div>
              <div>
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-email"
                  value={Email}
                  type="text"
                  style={{ width: "40vw" }}
                  onChange={(e) => {
                    setAssignEmail(e.target.value);
                  }}
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              style={{ marginLeft: "69vw" }}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserProfle;
