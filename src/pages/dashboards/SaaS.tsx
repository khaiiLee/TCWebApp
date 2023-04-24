import { Box, Grid, useTheme } from "@mui/material";
import Analytics from "components/Dashboards/saas/Analytics";
import SaaSCard from "components/Dashboards/saas/Card";
import Footer from "components/Dashboards/saas/Footer";
import RecentOrders from "components/Dashboards/saas/RecentOrders";
import Slicer from "components/Dashboards/saas/SectionSlicer";
import TopSelling from "components/Dashboards/saas/TopSelling";
import TotalSpent from "components/Dashboards/saas/TotalSpent";
import useTitle from "hooks/useTitle";
import BucketIcon from "icons/BucketIcon";
import EarningIcon from "icons/EarningIcon";
import PeopleIcon from "icons/PeopleIcon";
import WindowsLogoIcon from "icons/WindowsLogoIcon";
import { FC, useEffect, useState } from "react";
const axios = require('axios')
// import { data } from '../../components/Dashboards/saas/Data.js';

const SaaS: FC = () => {
  // change navbar title
  useTitle("Sales Dashboard");
  const [data, setdata] = useState<any[]>([]);
  const [yearmonthstate, setyearmonth] = useState('All');
  const [yearmonthslicer, setyearmonthslicer] = useState(['All']);
  const [yearlist, setyearlist] = useState<any[]>([]);
  const [yearstate, setyear] = useState('2023');
  const [curproduct, setcurproduct] = useState('All');
  const [curdata, setcurdata] = useState(data);

  const [totalspend, settotalspend] = useState<any[]>([]);

  let x=[]

  let getData = async(filter='',query='')=>{
    let queryx = query==''?`select * from [dbo].[app_f_sale] where 1=1 ${filter}`:query
    console.log(queryx)
    return await axios.get('https://bill-be.onrender.com/mssql', {
      params: {
        query: queryx,
        token: 123456
      },
      headers: { 'Content-Type': 'application/json' }
    });
  }
  useEffect(() => {
    
    getData(`and [Year]='${yearstate}' ${yearmonthstate=='All'?'':"and [Year-Month]='"+yearmonthstate+"'"}`).then(item=>{
      console.log(item['data']['data'])
      setcurdata(item['data']['data'])})

    getData('',`select distinct [Year-Month] from [dbo].[app_f_sale] where [year] = '${yearstate}' order by [Year-Month]`).then(item=>{setyearmonthslicer(['All'].concat(item['data']['data'].map((i:any)=>{return i['Year-Month']})))})

    getData('',`select distinct [Year] from [dbo].[app_f_sale] order by [Year]`).then(item=>{setyearlist(yearlist.concat(item['data']['data'].map((i:any)=>{return i['Year']})))})

    
   },[]);

  useEffect(() => {
    getData(`and [Year]='${yearstate}' ${yearmonthstate=='All'?'':"and [Year-Month]='"+yearmonthstate+"'"}`).then(item=>{setcurdata(item['data']['data'])})
    // console.log(curdata)
    getData('',`select distinct [Year-Month] from [dbo].[app_f_sale] where [year] = '${yearstate}' order by [Year-Month]`).then(item=>{setyearmonthslicer(['All'].concat(item['data']['data'].map((i:any)=>{return i['Year-Month']})))})
    setyearmonth('All')
 }, [yearstate]);

 useEffect(() => {
  settotalspend([
    curdata.filter((x)=> x['Month']=='01').map(i=>i['Spend']).reduce((a,b)=>a+b,0)
   ,curdata.filter((x)=> x['Month']=='02').map(i=>i['Spend']).reduce((a,b)=>a+b,0)
   ,curdata.filter((x)=> x['Month']=='03').map(i=>i['Spend']).reduce((a,b)=>a+b,0)
   ,curdata.filter((x)=> x['Month']=='04').map(i=>i['Spend']).reduce((a,b)=>a+b,0)
   ,curdata.filter((x)=> x['Month']=='05').map(i=>i['Spend']).reduce((a,b)=>a+b,0)
   ,curdata.filter((x)=> x['Month']=='06').map(i=>i['Spend']).reduce((a,b)=>a+b,0)
   ,curdata.filter((x)=> x['Month']=='07').map(i=>i['Spend']).reduce((a,b)=>a+b,0)
   ,curdata.filter((x)=> x['Month']=='08').map(i=>i['Spend']).reduce((a,b)=>a+b,0)
   ,curdata.filter((x)=> x['Month']=='09').map(i=>i['Spend']).reduce((a,b)=>a+b,0)
   ,curdata.filter((x)=> x['Month']=='10').map(i=>i['Spend']).reduce((a,b)=>a+b,0)
   ,curdata.filter((x)=> x['Month']=='11').map(i=>i['Spend']).reduce((a,b)=>a+b,0)
   ,curdata.filter((x)=> x['Month']=='12').map(i=>i['Spend']).reduce((a,b)=>a+b,0)

 ])
}, [curdata]);
  
  useEffect(() => {
    getData(`and [Year]='${yearstate}' ${yearmonthstate=='All'?'':"and [Year-Month]='"+yearmonthstate+"'"}`).then(item=>{setcurdata(item['data']['data'])})
    // console.log(curdata)
 }, [yearmonthstate]);

  const theme = useTheme();

  console.log(yearstate)
  console.log(curdata)
  let AllSpending = Intl.NumberFormat('en-US').format(curdata.map(i=>{return i['Spend']}).reduce((a,b)=>a+b,0))
  console.log(AllSpending)
  const cardList = [
    {
      price: AllSpending,
      Icon: BucketIcon,
      title: "All Spending",
      color: theme.palette.primary.main,
    },
    {
      price: 521,
      title: "Earnings",
      Icon: EarningIcon,
      color: theme.palette.primary.purple,
    },
    {
      price: 684,
      Icon: WindowsLogoIcon,
      title: "Weekly revenue",
      color: theme.palette.primary.red,
    },
    {
      price: 321,
      Icon: PeopleIcon,
      title: "New Clients",
      color: theme.palette.primary.yellow,
    },
  ];
  console.log(yearmonthstate)
  console.log(yearmonthslicer)
  return (
    <Box pt={2} pb={4}>
      <Grid container spacing={4}>
      <Grid item xs={12}>
          {/* <Slicer slicerdata={{yearmonth:data.map(i=>{return i['Year-Month']}).filter((x, i, a) => a.indexOf(x) == i),curyearmonth:yearmonthstate}} updatestate={setyearmonth}/> */}
          <Slicer slicerdata={{yearmonth:yearmonthslicer,curyearmonth:yearmonthstate,yearlist,curyear:yearstate}} updatestate={setyearmonth} updateyearstate={setyear}/>
        </Grid>
      </Grid>
      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} pt={2}>
        {cardList.map((card, index) => (
          <Grid item lg={3} xs={6} key={index}>
            <SaaSCard card={card} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={4} pt={4}>
        <Grid item lg={8} md={7} xs={12}>
          <TotalSpent spenddata={{dataprop:totalspend}}/>
        </Grid>
        <Grid item lg={4} md={5} xs={12}>
          <Analytics />
        </Grid>

        <Grid item lg={8} md={7} xs={12}>
          <RecentOrders />
        </Grid>
        <Grid item lg={4} md={5} xs={12}>
          <TopSelling />
        </Grid>

        <Grid item xs={12}>
          <Footer imageLink="/static/illustration/sass-dashboard.svg" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SaaS;
