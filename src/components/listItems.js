import React, {useContext} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import StarRate from '@material-ui/icons/StarRate';
import BarChart from '@material-ui/icons/BarChart';
import {useHistory} from "react-router-dom"
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { UserContext } from "../context/userContext";
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SmokingRoomsIcon from '@material-ui/icons/SmokingRooms';
import CakeIcon from '@material-ui/icons/Cake';
import SignalCellularConnectedNoInternet4BarIcon from '@material-ui/icons/SignalCellularConnectedNoInternet4Bar';
export const MainListItems = () => {
    const user = useContext(UserContext);
    const history = useHistory()
    function handleClick(page){
        user.setCurrPage(page)
        history.push("/dashboard/home")

    }

    return(
        <div>
        <ListItem button onClick={() => handleClick("flower")}>
          <ListItemIcon>
            <LocalFloristIcon />
          </ListItemIcon>
          <ListItemText primary="Flower" />
        </ListItem>
        <ListItem button onClick={() => handleClick("carts")}>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Carts" />
        </ListItem>
        <ListItem button onClick={() => handleClick("rolls")}>
          <ListItemIcon>
            <SmokingRoomsIcon />
          </ListItemIcon>
          <ListItemText primary="Pre-Rolls" />
        </ListItem>
        <ListItem button onClick={() => handleClick("concentrates")}>
          <ListItemIcon>
            <SignalCellularConnectedNoInternet4BarIcon />
          </ListItemIcon>
          <ListItemText primary="Concentrates" />
        </ListItem>
        <ListItem button onClick={() => handleClick("edibles")}>
          <ListItemIcon>
            <CakeIcon />
          </ListItemIcon>
          <ListItemText primary="Edibles" />
        </ListItem>
      </div>
    )
}
 


export const SecondaryListItems = () => {
    const user = useContext(UserContext);
    const history = useHistory()

    function handleClick(page){
        history.push(page)
    }

    return(  <div>
        <ListSubheader inset>Actions</ListSubheader>
        <ListItem button onClick={() => handleClick("requests")}>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Requests" />
        </ListItem>
        <ListItem button onClick={() => handleClick("rewards")}>
          <ListItemIcon>
            <StarRate />
          </ListItemIcon>
          <ListItemText primary="Rewards" />
        </ListItem>
        {
          user.user.User_Is_Admin ? 
        <ListItem button onClick={() => handleClick("analysis")}>
          
          <ListItemIcon>
            <BarChart />
          </ListItemIcon>
          <ListItemText primary="Analysis" />
        </ListItem>
        : 
        <ListItem button onClick={() => handleClick("useranalyze")}>
        <ListItemIcon>
        <BarChart />
      </ListItemIcon>
      <ListItemText primary="Analysis" />
    </ListItem>
}
      </div>)

}