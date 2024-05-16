import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import but from "../images/but.jpg";

export default function MediaCard(props) {
  return (
    <div style={{ marginTop: "1.5vh" }}>
      {props.active === true ? (
        <div style={{ backgroundColor: "green", height: "2vh" }}></div>
      ) : (
        <div style={{ backgroundColor: "blue", height: "2vh" }}></div>
      )}
      <Card sx={{ maxWidth: "70vw" }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            ID#{props.id}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Loan Ammount: {props.loanAmm}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Interest: {props.interest}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.det}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Click to Learn More</Button>
        </CardActions>
      </Card>
    </div>
  );
}
