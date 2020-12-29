import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import {Check, Close} from '@material-ui/icons';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {UserContext} from "../context/userContext"

import axios from "axios"
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function Request(props) {
  const classes = useStyles();
  const user = useContext(UserContext);
  const d = new Date(props.card.Request_Date)
  const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
  const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
  const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);

  function deleteRequest(){
    
    axios.delete(`https://ashing-pines.herokuapp.com/rewards/${props.card.Request_ID}`)
    .then(res => {
        console.log(res)
        props.redraw(curr => !curr)
        user.setAlertHandler("Successfully deleted request")
        user.setTriggerCount(i => !i)
    })
    .catch(err => {
        console.error(err)
        user.setError("Failed to delete request")
        
    })
  }

  function acceptRequest(){
    
    axios.post(`https://ashing-pines.herokuapp.com/rewards/reward/${props.card.Request_ID}`)
    .then(res => {
        props.redraw(curr => !curr)
        user.setAlertHandler("Successfully accepted request")
        user.setTriggerCount(i => i++)
    })
    .catch(err => {
        console.error(err)
        user.setError("Failed to accept request")
        
    })
  }

  return (

      
    <Card className={classes.root}>
        {console.log("props", props)}

      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {props.card.User_Name[0]}
          </Avatar>
        }
        action={
          user.user.User_Is_Admin ? 
            <>
          <IconButton aria-label="Confirm" onClick={acceptRequest}>
          <Check />
          </IconButton>
          <IconButton aria-label="Deny" onClick={deleteRequest}>
          <Close />
          </IconButton>
          </>
          :
          null
        }
       title={`${props.card.User_Name} Spent ${props.card.Request_Ammount}`}
        subheader={`${da}-${mo}-${ye}`}
      />
 
    </Card>
  );
}