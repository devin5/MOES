import React, { useContext, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { flowers } from "../data/flowers";
import { carts } from "../data/carts";
import { concentrates } from "../data/concentrates";
import { rolls } from "../data/rolls";
import { edibles } from "../data/edibles";
import ItemCard from "./ItemCard";
import { UserContext } from "../context/userContext";
import Typography from "@material-ui/core/Typography";
import Request from "./Request";
import axios from "axios";
import LinearProgress from "@material-ui/core/LinearProgress";

import AddRequest from "./AddRequest"
import { CenterFocusStrong } from "@material-ui/icons";

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
      .get("https://ashing-pines.herokuapp.com/rewards/")
      .then((x) => {

        if(user.user.User_Is_Admin !== true){
          x.data.data = x.data.data.filter(request => {
            return request.User_ID === user.user.User_ID
          })
        }


        setRewards(x.data.data);
        user.setRequestLength(x.data.data.length)
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [redraw]);

  return (
    <>
    {user.user.User_Is_Admin ? 
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
           <Request redraw={setRedraw} card={card} />
         </Grid>
       ))}
       
     </Grid> :
    < AddRequest />
     }
    
 
    </>
    
    
  );
}
