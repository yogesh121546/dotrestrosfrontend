import * as React from 'react';
import Grid from '@mui/material/Grid';
import Fab from '@mui/material/Fab';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useState } from 'react';
import backend_link from '../links';

const Hotelcard=(props)=> {

const [ratingOverall,setRatingOverall] = useState(0);

const restroget = async()=>{
  try {
    const data = await fetch(`${backend_link}/restaurants/${props.id}`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const restaurant = await data.json();
    setRatingOverall(restaurant.restaurant.ratings.overall);
  } catch (error) {
    console.log(error);
  }
}

useEffect(()=>{
  restroget();
},[])

  return (
    <Card sx={{ width:'320px',height:'330px',borderRadius:'20px', transition:'0.3s' ,'&:hover':{transform:'scale(1.05)',boxShadow:'-5px 10px 10px 0 rgba(0, 0, 0, 0.2)'} }}>
      
      <CardMedia
        component="img"
        height="210px"
        image={props.image}
        alt="Paella dish"
      />
      <CardHeader sx={{padding:'7px',paddingBottom:'0px',paddingLeft:'15px', fontSize:'15px'}}
       
        title={
        <Grid container sx={{height:'30px'}}>
          <Grid sx={{}} xs={8} >
            <Typography variant="h6" fontWeight="700" sx={{width:'300px',fontSize:'18px'}}>
              {props.name}
            </Typography>
          </Grid>
          <Grid sx={{ paddingLeft: "14%" }} xs={4} >
            <Fab sx={{ boxShadow: "none",transform:'scale(0.8)' }} color="primary" aria-label="add">
              <Typography variant="h7" fontWeight="700" fontSize="20px"  >
                {ratingOverall=== 0?"New":ratingOverall}
              </Typography>
            </Fab>
          </Grid>

        </Grid>
        }
        subheader={props.location}
      />
      <CardContent sx={{padding:'3px',paddingLeft:'15px'}}>
        <Typography variant="body2" color="text.secondary" sx={{width:'200px',padding:'0px'}}>
          Flat <span style={{ color: "#2A88DF",fontWeight:'bold' }} > {props.discount} </span> off on total bill
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{textAlign:'right', marginRight:'13px', marginTop:'5px'}}>
          <span style={{ color: "#2A88DF", fontSize:'15px', fontWeight:'bold'}} > {props.special} </span>
        </Typography>
      </CardContent>
     
      
    </Card>
  );
}
export default Hotelcard;