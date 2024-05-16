import React, { useState, useEffect, createContext, useContext } from "react";
import Web3 from "web3";
import abi from "../abi_auth.json"; // Replace with the actual path to your ABI file

// 1. Create a context
const AuthContext = createContext();

// 2. Create a provider to manage the contract values
export const authProvider = ({ children }) => {
  const [tokenURI, setTokenURI] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve values from the smart contract
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(
          abi,
          "0xE297247210B0416A3BC72e49730aC24D33838C28"
        ); // Replace with your contract address
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const tokenOfOwnerByIndex = await contract.methods
          .tokenOfOwnerByIndex(accounts[0], 0)
          .call();
        const tokenID = tokenOfOwnerByIndex.toString();
        const tokenURI = await contract.methods
          .tokenURI(parseInt(tokenID))
          .call();

        // Store values in context
        setTokenURI(tokenURI);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  return (
    <AuthContext.Provider value={{ tokenURI, error }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Create a hook to access the context values
export const useContract = () => useContext(AuthContext);
