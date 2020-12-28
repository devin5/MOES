import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import moment from "moment";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits(props) {
  const classes = useStyles();

  function getWeekSales() {
    let salesTotal = 0;
    const weekSales = props.sales.filter((sale) => {
      var now = moment();
      var input = moment(sale.Sales_Date);
      var sunday = now.clone().weekday(0);
      var saturday = now.clone().weekday(6);

      var isNowWeekday = now.isBetween(sunday, saturday, null, '[]');
      // var isThisWeek = now.isoWeek() === input.isoWeek();
      return isNowWeekday
    });

    weekSales.forEach((sale) => {
      salesTotal += sale.Sales;
    });
    return salesTotal;
  }

  function getDaySales() {
    let salesTotal = 0;
    const daySales = props.sales.filter((sale) => {
      var now = moment();
      var input = moment(sale.Sales_Date);
      

      var isThisDay = now.format('MM/DD/YYYY') === input.format('MM/DD/YYYY');
      return isThisDay;
    });
    console.log("day sales", daySales)
    

    daySales.forEach((sale) => {
      salesTotal += sale.Sales;
    });

   
    return salesTotal;
  }
  
  const dayTypo = (
    <Typography color="textSecondary" className={classes.depositContext}>
      As of {moment().format("dddd, MMMM Do YYYY, h:mm:ss a")}
    </Typography>
  );
  const today = moment();
  const from_date = today.startOf("week");
  const to_date = today.endOf('week');
console.log(from_date)
  
  const weekTypo = (
      <>
  
    <Typography color="textSecondary" className={classes.depositContext}>
      Through {to_date.format("dddd, MMMM Do YYYY, h:mm:ss a")}
    </Typography>
 </>
  );

  getWeekSales();
  return (
    <React.Fragment>
      <Title>
        {props.type === "week" ? "This Week's Sales" : "Todays Sales"}
      </Title>
      <Typography component="p" variant="h4">
        {props.type === "week" ? getWeekSales() : getDaySales()}
      </Typography>
      {/* <Typography color="textSecondary" className={classes.depositContext}>
        As of {moment().format("dddd, MMMM Do YYYY, h:mm:ss a")}
      </Typography> */}
      {props.type === "week" ? weekTypo : dayTypo}


      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}
