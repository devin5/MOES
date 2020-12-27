import React, { useContext } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {flowers} from "../data/flowers"
import {carts} from "../data/carts"
import {concentrates} from "../data/concentrates"
import {rolls} from "../data/rolls"
import {edibles} from "../data/edibles"
import ItemCard from "./ItemCard"
import { UserContext } from '../context/userContext';
import Typography from "@material-ui/core/Typography";



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
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));





export default function Album() {
  const classes = useStyles();
  const user = useContext(UserContext);

  const typeographyDisplay = (
    <Typography className={classes.message} paragraph>No Current Items</Typography>
)

  function currActiveArray(){
    if(user.currPage === "flower"){
        return flowers
    }
    else if(user.currPage === "carts"){
        return carts
    }
    else if(user.currPage === "concentrates"){
        return concentrates
    }
    else if(user.currPage === "rolls"){
        return rolls
    }
    else{
        return edibles
    }
    
}

  return (
    <React.Fragment>
    <CssBaseline />
    <main>
        <Container className={classes.cardGrid} maxWidth="xlg">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {currActiveArray().map((card, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
               <ItemCard card={card} />
              </Grid>
            ))}
          </Grid>
          {currActiveArray().length ? null : typeographyDisplay}
         
        </Container>
        </main>
        </React.Fragment>
  
  );
}