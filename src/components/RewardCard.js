import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import {Check, Close} from '@material-ui/icons';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
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



  function acceptReward(){
    
    axios.delete(`https://ashing-pines.herokuapp.com/rewards/rewards/${props.card.Reward_ID}/`)
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
            <>
          <IconButton aria-label="Confirm" onClick={acceptReward}>
          <Check />
          </IconButton>
          </>
        }
       


        title={`${props.card.User_Name} Reward: ${props.card.Reward}`}
        // subheader={`${da}-${mo}-${ye}`}
      />
 

     
    </Card>
  );
}