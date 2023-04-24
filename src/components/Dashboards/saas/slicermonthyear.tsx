import { KeyboardArrowDown } from "@mui/icons-material";
import { Button, MenuItem, Popover } from "@mui/material";
import { H6, Small } from "components/Typography";
import { FC, useRef, useState } from "react";

// dummy options

interface slicerData {
  slicerdata: any;
  updatestate:any;
}

const Slicermonthyear: FC<slicerData> = ({ slicerdata,updatestate}) => 
{
  const { yearmonth, curyearmonth} = slicerdata;
  const l_updatestate = updatestate
  
  console.log(yearmonth)
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(curyearmonth);

  const handleChange = (item: string) => {
      setSelected(item);
      l_updatestate(item)
      console.log(item)
      setOpen(false);
  };

  return (
    <>
      <div>
      <Button
        disableRipple
        onClick={() => setOpen(true)}
        ref={anchorRef}
        endIcon={<KeyboardArrowDown sx={{ color: "text.disabled" }} />}
        sx={{ p: 0, "&:hover": { backgroundColor: "transparent" } }}
      >
        <H6 color="text.disabled">{curyearmonth}</H6>
      </Button>
      <Popover
        keepMounted
        open={open}
        onClose={() => setOpen(false)}
        anchorEl={anchorRef.current}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        PaperProps={{ sx: { py: "0.5rem" } }}
      >
        {yearmonth.map((item:any, index:any) => (
          <MenuItem
            key={index}
            onClick={() => handleChange(item)}
            sx={{
              "&:hover": {
                color: "primary.main",
              },
            }}
          >
            <Small fontWeight={500} py={0.5}>
              {item}
            </Small>
          </MenuItem>
        ))}
      </Popover>
      </div>  
    </>
  );
};

export default Slicermonthyear;
