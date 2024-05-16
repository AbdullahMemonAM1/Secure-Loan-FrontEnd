import React, { useEffect, useState } from "react";
import NavBar from "../Components/Navbar";
import ava from "../images/Loan.png";
import { Avatar } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import abi from "../abi_auth.json"; // Replace with the actual path to your ABI file
import Web3 from "web3";
import Card2 from "../Components/LoanCard";
const UserProfle = () => {
  const { id } = useParams();

  const [creditScore, setCreditScore] = useState(700); // Added credit score state
  const [User, setUser] = useState([]); // Added credit score state

  async function getUserInfo() {
    console.log(id);
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      abi,
      "0xE297247210B0416A3BC72e49730aC24D33838C28"
    ); // Replace with your contract address
    try {
      console.log("AHAHA");
      const userData = await contract.methods.getUserInfo(id).call();
      console.log(userData);
      setUser(userData);
      // setUser(userData);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUserInfo();
  }, []); // Trigger fetch on loanId change

  return (
    <>
      <NavBar />
      <div
        style={{
          display: "flex",
          marginTop: "5vh",
          marginLeft: "3vw",
        }}
      >
        <Avatar
          style={{ height: "25vh", width: "15vw" }}
          alt="Remy Sharp"
          src={ava}
        />
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
        <div style={{ width: "80vw" }}>
          <form className="mt-10">
            <div
              className="md:flex md:items-center mb-6 "
              style={{ justifyContent: "space-between", marginLeft: "8vw" }}
            >
              <div>
                <label
                  className="block text-gray-500 font-bold md:text-right mb-2 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  Full Name
                </label>
              </div>
              <div>
                <Link to={`https://sepolia.etherscan.io/address/${id}`} >
                <div
                  readOnly
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-cnic"
                  style={{ width: "40vw" }}
                >
                  {User[0]}
                </div></Link>
              </div>
            </div>

            <div
              className="md:flex md:items-center mb-6 "
              style={{ justifyContent: "space-between", marginLeft: "8vw" }}
            >
              <div>
                <label
                  className="block text-gray-500 font-bold md:text-right mb-2 md:mb-0 pr-4"
                  htmlFor="inline-password"
                >
                  Role
                </label>
              </div>
              <div>
                <div
                  readOnly
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-cnic"
                  style={{ width: "40vw" }}
                >
                  {User[1]}
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
                  htmlFor="inline-password"
                >
                  Email:
                </label>
              </div>
              <div>
                <div
                  readOnly
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-cnic"
                  style={{ width: "40vw" }}
                >
                  {User[2]}
                </div>
              </div>
            </div>
            {/* Credit score field */}
            <div
              className="md:flex md:items-center mb-6 "
              style={{ justifyContent: "space-between", marginLeft: "8vw" }}
            ></div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserProfle;
