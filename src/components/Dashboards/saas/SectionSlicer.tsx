import { Card, styled } from "@mui/material";
import Slicermonthyear from "components/Dashboards/saas/slicermonthyear";
import { FC } from "react";

// dummy options
interface slicerData {
  slicerdata: any;
  updatestate:any;
  updateyearstate:any
}



// styled components
const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  padding: "1rem 1.5rem",
  gridGap: "2rem",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    padding: "2rem",
    "& img": { marginBottom: "1.5rem" },
  },
}));

// component props interface


const Slicer: FC<slicerData> = ({ slicerdata,updatestate,updateyearstate}) => {
  const { yearmonth, curyearmonth,yearlist,curyear, color, price } = slicerdata;
  
  console.log(yearmonth)



  return (
    <>
    <StyledCard >
      <div>
      <Slicermonthyear slicerdata={{yearmonth:yearlist,curyearmonth:curyear}} updatestate={updateyearstate}/>
      </div>  
      <div>
      <Slicermonthyear slicerdata={{yearmonth:yearmonth,curyearmonth:curyearmonth}} updatestate={updatestate}/>
      </div>  

          
      </StyledCard>
    
    </>
    
  );
};

export default Slicer;
