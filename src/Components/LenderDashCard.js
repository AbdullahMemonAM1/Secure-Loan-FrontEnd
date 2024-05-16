import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import nft from "../images/nft.jpg";
export default function MediaCard(props) {
  return (
    <div style={{ marginTop: "1.5vh" }}>
      <Card
        sx={{ maxWidth: 345 }}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.3)",
        }}
      >
        <CardMedia
          sx={{ height: 140, width: "20vw" }}
          image={nft}
          title="BlockChain"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            User Profile
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <div style={{ display: "flex" }}>
              <h1>Name:</h1>
              <p>{props.Name}</p>
            </div>
            <div style={{ display: "flex", fontFamily: "ubuntu" }}>
              <h1>Role:</h1>
              <p>{props.Role}</p>
            </div>
            <div style={{ display: "flex", fontFamily: "ubuntu" }}>
              <h1>Email:</h1>
              <p>{props.Email}</p>
            </div>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}