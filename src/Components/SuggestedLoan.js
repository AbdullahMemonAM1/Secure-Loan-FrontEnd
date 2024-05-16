import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import but from "../images/but.jpg";
import { Link } from "react-router-dom";

export default function MediaCard(props) {
  return (
    <div style={{ marginTop: "1.5vh", marginRight: "1vw" }}>
      <Card>
        <CardContent
          sx={{
            maxWidth: "20vw",
            minHeight: "170px",
            minWidth: "300px",
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            #{props.id}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Loan Ammount: {props.loanAmm}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Interest: {props.interest}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Detail: {props.det}
          </Typography>
        </CardContent>
        <Link to={`/loaninfo/${props.id}`} target="_blank">
          <Button>View More</Button>
        </Link>
      </Card>
    </div>
  );
}
