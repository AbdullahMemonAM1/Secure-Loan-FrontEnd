// src/components/NotificationPage.js

import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import styled from "@emotion/styled";
import { Navbar } from "@material-tailwind/react";
import LendNavbar from "../Components/LenderNavbar";

// Styled Card component with modern design
const StyledCard = styled(Card)`
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Mock data for testing
    const mockNotifications = [
      { id: 1, type: "LoanCreated", message: "New loan created" },
      { id: 2, type: "LoanInvested", message: "Loan invested by lender" },
      { id: 3, type: "LoanRepaid", message: "Loan repaid by borrower" },
      { id: 3, type: "LoanRepaid", message: "Loan repaid by borrower" },
      { id: 3, type: "LoanRepaid", message: "Loan repaid by borrower" },
      { id: 3, type: "LoanRepaid", message: "Loan repaid by borrower" },
      { id: 3, type: "LoanRepaid", message: "Loan repaid by borrower" },


    ];

    setNotifications(mockNotifications);
  }, []);

  return (
    <div>
      <LendNavbar />
      <div style={{margin:20}}>
      <h1 style={{ textAlign: "center", marginBottom: "24px" }}>
        Notifications
      </h1>
      <Grid container spacing={2} justifyContent="center">
        {notifications.map((notification) => (
          <Grid item xs={12} sm={6} md={4} key={notification.id}>
            <StyledCard>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                  {notification.type}
                </Typography>
                <Typography variant="body1" component="p">
                  {notification.message}
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
      </div>
    </div>
  );
};

export default NotificationPage;
