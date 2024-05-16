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
import { Link } from "react-router-dom";

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
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    console.log(props.data);
    setExpanded(!expanded);
  };
  return (
    
      <Card
        sx={{ width: "60vw", height: "30vh" }}
        style={{ marginTop: "1.5vh" }}
      >
        {props.Active === true ? (
          <div style={{ backgroundColor: "green", height: "2vh" }}></div>
        ) : (
          <div style={{ backgroundColor: "blue", height: "2vh" }}></div>
        )}
        <CardHeader
          title={props.role==="Lender"?props.data.borrower:props.data.packageOwner}
          subheader={props.role==="Lender"?"":new Date(props.data.startTime * 1000).toLocaleDateString()} 
        />

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Interest: {props.role==="Lender"?props.data.interestRate:props.data.interest}
            <br />
            Loan Ammount:{props.role==="Lender"?props.data.amount:props.data.loanAmount}
            <br />
            Return Time:{props.role==="Lender"? props.data.repaymentTerm.toString() + " Days":props.data.timeToReturn}
            <br />
            Bank Ammount:{props.role==="Lender"?  "   -" :props.data.bankAmount}
          </Typography>
        </CardContent>
        <CardActions disableSpacing></CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph></Typography>

            <Typography paragraph>
              * Terms and conditions apply{props.det}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
  );
}
