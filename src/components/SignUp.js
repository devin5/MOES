import React, { useContext, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../context/userContext";
import Copyright from "./Copyright";
import axios from "axios"
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://images.pexels.com/photos/2731663/pexels-photo-2731663.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const user = useContext(UserContext);

  const [form, setForm] = useState({
      User_Name: "",
      User_Password: "",
      User_Birthday: "",
      User_Is_Admin: "no"
  })
  const [loading, setLoading] = useState(false)

  function handleChange(event) {
    setForm({...form, [event.target.name]: event.target.value});
    console.log(form)
  }

function registerApiCall(e){
    e.preventDefault()
    setLoading(true)
 axios.post("https://ashing-pines.herokuapp.com/auth/users/register", form)
 .then(x=> {
    user.setUserData(x.data.data.user)
    user.pushPageHistory("/dashboard/home")
    setLoading(false)
})
.catch(err => {
    console.error(err)
    user.setError("Error registering try again with different credentials")
    setLoading(false)
})


}

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form onSubmit={registerApiCall} onChange={handleChange}  className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="User Name"
              name="User_Name"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="User_Password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="User_Birthday"
              type="date"
              id="birthday"
            />

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            {loading && <CircularProgress />}
            <Grid container>
              <Grid item>
                <Link onClick={() => user.pushPageHistory("/")} variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
