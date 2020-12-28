import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import moment from "moment"
// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

// const data = [
//   createData('00:00', 0),
//   createData('03:00', 300),
//   createData('06:00', 600),
//   createData('09:00', 800),
//   createData('12:00', 1500),
//   createData('15:00', 2000),
//   createData('18:00', 2400),
//   createData('21:00', 2400),
//   createData('24:00', undefined),
// ];


const WeekdayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",]



export default function Chart(props) {
  const theme = useTheme();

  function getWeekSales(){
    const data2 = []
    const WeekdayObj= {Sunday: 0, Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0}

    const weekSales = props.sales.filter(sale => {
        var now = moment();
             var input = moment(sale.Sales_Date);
          var sunday = now.clone().weekday(0);
          var saturday = now.clone().weekday(6);
          var isNowWeekday = now.isBetween(sunday, saturday, null, '[]');
        return isNowWeekday
        
        // let salesTotal = 0;
        // const weekSales = props.sales.filter((sale) => {
        //   var now = moment();
        //   var input = moment(sale.Sales_Date);
        //   var sunday = now.clone().weekday(0);
        //   var saturday = now.clone().weekday(6);
    
        //   var isNowWeekday = now.isBetween(sunday, saturday, null, '[]');
        //   // var isThisWeek = now.isoWeek() === input.isoWeek();
        //   return isNowWeekday

    })

    weekSales.forEach(sale => { 
        var input = moment(sale.Sales_Date).day()
        WeekdayObj[WeekdayArray[input]] += sale.Sales
    })
   Object.keys(WeekdayObj).forEach(key =>{
    data2.push({time: key, amount: WeekdayObj[key]})
   }
       
   )
   return data2


}


  return (
    <React.Fragment>
      <Title>This Week</Title>
      <ResponsiveContainer>
        <LineChart
          data={getWeekSales()}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Sales ($)
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}