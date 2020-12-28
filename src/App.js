import React, {useState, useEffect} from "react"
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"
import TestItems from "./components/TestItems"
import Dashboard from "./components/Dashboard"
import Rewards from "./components/Rewards"
import Analysis from "./components/Analysis"
import Copyright from "./components/Copyright";
import CardsTest from "./components/CardsTest"
import RequestLayout from "./components/RequestLayout"
import './App.css';
import { ThemeProvider } from "@material-ui/core";
import {theme} from "./themes/MUITheme"
import {UserContext}from "./context/userContext"
import {Route, Redirect, useHistory} from "react-router-dom"
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from "axios"
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function App() {

const history = useHistory()
const [user, setUser] = useState({})
const [error, setErr] = useState("")
const [alert, setAlert] = useState("")
const [alertOpen, setAlertOpen] = useState(false)
const [open, setOpen] = useState(false)
const [currPage, setCurrPage] = useState("flower")
const [requestLength, setRequestLength] = useState(0)
const [triggerCount, setTriggerCount] = useState(true)



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



const setAlertHandler = (str) =>{
setAlert(str)
setAlertOpen(true)
}
const closeAlertHandler = (str) =>{
  setAlert("")
  setAlertOpen(false)
  }

  useEffect(() => {
    axios
      .get("https://ashing-pines.herokuapp.com/rewards/")
      .then((x) => {
        setRequestLength(x.data.data.length);
       
      })
      .catch((err) => {
        console.error(err);
       
      });
  }, [triggerCount]);




  return (
    <UserContext.Provider value={{pushPageHistory, setUserData, user, setError,setAlertHandler,  currPage, setCurrPage, setTriggerCount, requestLength, setRequestLength}}>
    <ThemeProvider theme={theme}>
    <div className="App">
     {/* {console.log("PAGE", currPage)}
     {console.log("User", user)} */}

    <Snackbar open={open} autoHideDuration={8000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {error}
        </Alert>
      </Snackbar>

      <Snackbar open={alertOpen} autoHideDuration={8000} onClose={closeAlertHandler}>
        <Alert onClose={closeAlertHandler} severity="success">
          {alert}
        </Alert>
      </Snackbar>


   
      <Route exact path="/" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      
      <Route path="/dashboard/home" render={

          // argument is props passed from `<Route /`>
          routeProps => 

            <Dashboard >
              <CardsTest/>
            </Dashboard>

        } />

<Route path="/dashboard/requests" render={

// argument is props passed from `<Route /`>
routeProps => 

  <Dashboard>
    <RequestLayout/>
   
  </Dashboard>

} />

<Route path="/dashboard/rewards" render={

// argument is props passed from `<Route /`>
routeProps => 

  <Dashboard>
    <Rewards/>
  </Dashboard>

} />
<Route path="/dashboard/analysis" render={

// argument is props passed from `<Route /`>
routeProps => 

  <Dashboard>
    <TestItems/>
  </Dashboard>

} />

  
<Copyright/>
      <Redirect from="*" to="/" />
      
    </div>



    </ThemeProvider>
    </UserContext.Provider>
  );
}

export default App;

