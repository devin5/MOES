import React, { useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Alert from "@material-ui/lab/Alert";
import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";
import Collapse from "@material-ui/core/Collapse";
import { UserContext } from "../context/userContext";

import { BrightnessLow, BrightnessHigh, Brightness6 } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

export default function Album(props) {
  const classes = useStyles();
  const user = useContext(UserContext);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function createSeverity() {
    if (props.card.strain === "Sativa") {
      return "warning";
    } else if (props.card.strain === "Indica") {
      return "info";
    } else {
      return "success";
    }
  }

  function createIcon() {
    if (props.card.strain === "Sativa") {
      return <BrightnessHigh fontSize="inherit" />;
    } else if (props.card.strain === "Indica") {
      return <BrightnessLow fontSize="inherit" />;
    } else {
      return <Brightness6 fontSize="inherit" />;
    }
  }

  function buildPrice() {
    if (user.currPage === "flower") {
      return (
        <>
          <Typography paragraph>{`3.5 (g): ${props.card.eigth}`}</Typography>
          <Typography paragraph>{`1.0 (oz): ${props.card.oz}`}</Typography>
        </>
      );
    }
    if (user.currPage === "carts" || user.currPage === "rolls") {
        return (
          <>
            <Typography paragraph>{`1 (g): ${props.card.price}`}</Typography>
          </>
        );
      }
      if (user.currPage === "edibles" ) {
        return (
          <>
            <Typography paragraph>{`1 Edible: ${props.card.price}`}</Typography>
          </>
        );
      }
  }

  return (
    <Card className={classes.card}>
      <Alert icon={createIcon()} severity={createSeverity()}>
        {props.card.strain}
      </Alert>
      <CardMedia
        className={classes.cardMedia}
        image={props.card.src}
        title="Image title"
      />
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          {props.card.type}
        </Typography>
        <div className={classes.root}>
          <Chip size="small" label={`THC ${props.card.thc}`} />{" "}
          <Chip size="small" label={`CBD ${props.card.cbd}`} />{" "}
          <Chip size="small" label={`Sativa ${props.card.sativa}`} />{" "}
          <Chip size="small" label={`Indica ${props.card.indica}`} />
        </div>
      </CardContent>
      {buildPrice()}

      <IconButton
        className={clsx(classes.expand, {
          [classes.expandOpen]: expanded,
        })}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <ExpandMoreIcon />
      </IconButton>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Description</Typography>
          <Typography paragraph>{props.card.desc}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
