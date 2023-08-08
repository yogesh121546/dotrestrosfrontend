import React from 'react';
import dayjs from 'dayjs';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const DatePick = (props) => {  

  const callNext = (v) => {
    props.forValue(v)
  }

  const currDate=dayjs()



  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>


      <DemoItem>
        <DatePicker sx={{minWidth:'330px',maxWidth:'330px'}} onChange={callNext} disablePast label={'Select Date'} views={['day']} format='DD/MM/YYYY' maxDate={currDate.add(7,'day')} />
      </DemoItem>


    </LocalizationProvider>
  );
}
export default DatePick;