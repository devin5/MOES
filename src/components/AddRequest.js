import React, {useContext} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import axios from "axios"
import userEvent from '@testing-library/user-event';
import {UserContext} from "../context/userContext"
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Typography from "@material-ui/core/Typography";
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    marginTop: theme.spacing(12),
    width: '80%',
  },
  message: {
    marginLeft: theme.spacing(10),
    marginRight: theme.spacing(10),
    marginTop: theme.spacing(5),


  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '80%',
  },
}));

export default function InputAdornments() {
  const classes = useStyles();
  const user = useContext(UserContext);

  const [values, setValues] = React.useState({
    amount: '',
    
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };



  const makeRequest = (event) => {


      const body = { 
          "User_ID": user.user.User_ID,
        "Request_Ammount": Math.trunc(Number(values.amount))
    }
    axios.post("https://ashing-pines.herokuapp.com/rewards/request", body)
    .then(res => {
        user.setAlertHandler("Successfully accepted request")
    })
    .catch(err => {
        console.error(err)
        user.setError("Failed to request request")
        
    })

  };

  return (
    <div className={classes.root}>
      <div>
     
        <FormControl fullWidth className={classes.margin} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-amount">Ammount Spent</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={values.amount}
            onChange={handleChange('amount')}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            labelWidth={118}
            endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={makeRequest}
                  >
                     <AddCircleOutlineIcon /> 
                  </IconButton>
                </InputAdornment>
              }
          />
        </FormControl>
        <Typography className={classes.message} paragraph>Add request here. Please Allow up to 24 hours for the request to be processed. If the request earned you a reward you can check your earned rewards in the rewards tab but the request will need to be process before reward is issue. Submitting Fradululant Requests could result in banishment from AshingPines community. These requests are all accepted by hand adding fake requests wastes time and adds work for our encrypted servers. Stay Frosty :)</Typography>
      </div>
    </div>
  );
}