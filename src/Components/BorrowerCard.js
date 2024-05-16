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
    setExpanded(!expanded);
  };
  const timeToReturnInDays = Math.ceil(props.Returntime / (60 * 60 * 24)); // Convert seconds to days


  return (
    <Card sx={{ width: "60vw", height: "30vh" }} style={{ marginTop: "1.5vh" }}>
      <CardHeader
        title={props.user}
        subheader={new Date(props.date * 1000).toLocaleDateString()}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Bank Ammount:{props.BankAmmount}
          <br />
          Loan Ammount:{props.loanamm}
          <br />
          Interest:{props.Interest}
          <br />
          Time to return:
          {timeToReturnInDays} Days
          <br />
          Description:
          {props.des}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph></Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
