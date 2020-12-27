import React, {useState} from "react"
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"
import Test from "./components/Test"
import TestItems from "./components/TestItems"
import Dashboard from "./components/Dashboard"

import './App.css';
import { ThemeProvider } from "@material-ui/core";
import {theme} from "./themes/MUITheme"
import {UserContext}from "./context/userContext"
import {Route, Redirect, useHistory} from "react-router-dom"
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function App() {

const history = useHistory()
const [user, setUser] = useState({})
const [error, setErr] = useState("")
const [open, setOpen] = useState(false)

const pushPageHistory = (path) => {
  history.push(path)
}
const setUserData = (userObj) => {
  setUser(userObj)
}
const setError = (errStr) => {
  setErr(errStr)
  setOpen(true)
}

const handleClose = () => {
  setOpen(false)
  setErr("")
}





  return (
    <UserContext.Provider value={{pushPageHistory, setUserData, user, setError}}>
    <ThemeProvider theme={theme}>
      {console.log("User", user)}
    <div className="App">

    <Snackbar open={open} autoHideDuration={8000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {error}
        </Alert>
      </Snackbar>


   
      <Route exact path="/" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/test" component={Test} />
      
      <Route path="/dashboard/home" render={

          // argument is props passed from `<Route /`>
          routeProps => 

            <Dashboard>
              <TestItems/>
            </Dashboard>

        } />

  

      <Redirect from="*" to="/" />
      
    </div>


    </ThemeProvider>
    </UserContext.Provider>
  );
}

export default App;

// <div className="jumbotron">
// <div className="container">
//     <div className="col-md-8 offset-md-2">
//         {alert.message &&
//             <div className={`alert ${alert.type}`}>{alert.message}</div>
//         }
//         <Router history={history}>
//             <Switch>
//                 <PrivateRoute exact path="/" component={HomePage} />
//                 <Route path="/login" component={LoginPage} />
//                 <Route path="/register" component={RegisterPage} />
//                 <Redirect from="*" to="/" />
//             </Switch>
//         </Router>
//     </div>
// </div>
// </div>
