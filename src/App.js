import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./Routes/Home";
import Profile from "./Routes/UserProfile";
import SignIn from "./Routes/Signin";
import LoanHistory from "./Routes/LoanHistory";
import BorrowerDashboard from "./Routes/BorrowerDashboard";
import Signup from "./Routes/Signup";
import CustomLoan from "./Routes/CustomLoan";
import CustomLoanRepayment from "./Routes/CustomLoanRepayment";
import NotificationPage from "./Routes/Notifications";

import LenderDashboard from "./Routes/LenderDashboard";
import LoanRepayment from "./Routes/Repayment";
import Package from "./Routes/Package";
import LoanInfo from "./Routes/LoanInfo";
import ActivePackage from "./Routes/ActivePackages";
import Mypackages from "./Routes/MyPackages";
import UserProfile from "./Routes/Userprofile(Nonedit)";
import LenderLoaninfo from "./Routes/lenderLoaninfo";
import Search from "./Routes/Search";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Example logic to determine user role based on authentication status
    const user = localStorage.getItem("user");
    if (user === null) {
      setIsAuthenticated(false);
      setUserRole(null); // Ensure userRole is null when not authenticated
    } else {
      setIsAuthenticated(true);
      const userData = JSON.parse(user);
      setUserRole(userData.status);
    }
  }, [isAuthenticated]);

  return (
    <div>
      <Routes>
        {/* Routes for unauthenticated users */}
        {!isAuthenticated && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<Signup />} />
          </>
        )}
        {/* Authenticated routes */}
        {isAuthenticated && (
          <>
            {userRole === "Lender" && (
              <>
                <Route path="/" element={<LenderDashboard />} />
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/notifications" element={<NotificationPage />} />

                <Route path="/user/profile/:id" element={<UserProfile />} />
                <Route
                  path="/Lenderloaninfo/:loanId"
                  element={<LenderLoaninfo />}
                />

                <Route path="/createpackage" element={<Package />} />
                <Route path="/ActivePackage" element={<ActivePackage />} />
                <Route path="/MyPackage" element={<Mypackages />} />
                <Route path="/repayment/:loanId" element={<LoanRepayment />} />
                <Route path="/Search" element={<Search />} />

                {/* Add more Lender-specific routes here */}
              </>
            )}
            {userRole === "Borrower" && (
              <>
                <Route path="/Search" element={<Search />} />
                <Route path="/user/profile/:id" element={<UserProfile />} />
                <Route
                  path="/custom/repayment/:loanId"
                  element={<CustomLoanRepayment />}
                />
                <Route path="/notifications" element={<NotificationPage />} />

                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/createpackage" element={<Package />} />
                <Route path="/ActivePackage" element={<ActivePackage />} />
                <Route path="/MyPackage/:wallet" element={<Mypackages />} />
                <Route path="/" element={<BorrowerDashboard />} />
                <Route path="/customloan" element={<CustomLoan />} />
                <Route path="/repayment/:loanId" element={<LoanRepayment />} />
                <Route path="/loaninfo/:loanId" element={<LoanInfo />} />
                <Route path="/history" element={<LoanHistory />} />
                <Route path="/MyPackage" element={<Mypackages />} />
                <Route path="/profile" element={<Profile />} />
                {/* Add more Borrower-specific routes here */}
              </>
            )}
          </>
        )}
        {/* Default redirect for unhandled routes */}
      </Routes>
    </div>
  );
}

export default App;
