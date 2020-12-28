import React, { useContext, useEffect } from "react";

import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import { UserContext } from "../context/userContext";

import RewardCard from "./RewardCard";
import axios from "axios";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  message: {
    padding: theme.spacing(10, 0, 0, 5),
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
    paddingLeft: theme.spacing(3),
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
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(4),
    },
  },
}));

export default function RequestLayout() {
  const classes = useStyles();
  const [rewards, setRewards] = React.useState([]);
  const [loading, setLoading] = React.useState([]);
  const [redraw, setRedraw] = React.useState(false);
  const user = useContext(UserContext);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://ashing-pines.herokuapp.com/rewards/rewards")
      .then((x) => {
        setRewards(x.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [redraw]);

  return (
    <Grid container spacing={6} className={classes.cardGrid}>
      {loading && (
        <div className={classes.root}>
          <LinearProgress color="secondary" />
          <LinearProgress color="secondary" />
          <LinearProgress color="primary" />
          <LinearProgress color="secondary" />
        </div>
      )}
      {rewards.map((card, index) => (
        <Grid item key={index} xs={12} sm={6} md={4}>
          <RewardCard redraw={setRedraw} card={card} />
        </Grid>
      ))}
    </Grid>
  );
}
