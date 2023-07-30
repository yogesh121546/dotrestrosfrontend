import React, { useEffect } from 'react'
import Header from './Header'
import Grid from '@mui/material/Grid';
import Fab from '@mui/material/Fab';
import { Link, useParams } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import { CCarousel,CCarouselItem,CImage } from '@coreui/react'

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import backend_link from '../links'

import DatePick from './Datepick';
import Timepick from './Timepick';
import Footer from "./Footer";


import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import "../App.css"
import Hotellist from "./Hotellist"
import { useState } from 'react';
import { Button } from '@mui/material';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 5,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: 'yellow',
  },
}));
const Hotelpage = () => {

  let i = 0;

  const { id } = useParams()

  const hotel = Hotellist.find((h) => {
    return (
      String(h.id) === id
    )
  })

  const [expanded, setExpanded] = useState(false);
  const [plus, setPlus] = useState();
  const [dishObject, setDishObject] = useState({
    name: "",
    qty: "",
    price: ""
  });
  const [dishArray, setDishArray] = useState([])
  const [sumDish, setsumDish] = useState(true)
  const [total, setTotal] = useState(0)
  const [bookingName, setbookingName] = useState("")
  const [telno, settelno] = useState(123456789)
  const [date, setdate] = useState("")
  const [time, settime] = useState("")
  const [person,setPerson] = useState("")
  const [combo,setCombo] = useState("")
  const [instruction,setInstruction] = useState("")

  //restaurent prices map
  const prices = [
    { price: 190, name: "Kaju butter" },
    { price: 170, name: "Kadhai paneer" },
    { price: 100, name: "paneer punjabi" },
    { price: 500, name: "chicken do pyaza" },
  ]

  useEffect(() => {
    if (dishObject.name !== "") {

      let existing = false;
      dishArray.forEach(obj => {
        if (obj.name === dishObject.name) {
          return existing = true;
        }
      })
      if (existing) {
        const newdishArray = dishArray.map(obj => {

          if (obj.name === dishObject.name) {
            if (plus) return { ...obj, qty: (obj.qty) + 1 };
            else {
              return { ...obj, qty: obj.qty - 1 }
            }
          }
          else {
            return obj
          }
        });
        setDishArray(newdishArray);
      } else if (plus) {
        setDishArray(
          [
            ...dishArray,
            dishObject
          ]
        )
      }
    }
  }, [plus, dishObject])
useEffect(() => {
    const summary = dishArray.map((dish) => {
      if (dish.qty > 0) {
        return (
          <Grid sx={{ textAlign: "center", color: "#282828", marginBottom: "2%" }} container >
            <Grid xs={4}>
              <Typography variant="h7" fontWeight="400" >
                {dish.name}
              </Typography>
            </Grid>
            <Grid xs={4}>
              <Typography variant="h7" fontWeight="400" >
                {dish.qty}

              </Typography>
            </Grid>
            <Grid xs={4}>
              <Typography variant="h7" fontWeight="400" >
                {dish.price}

              </Typography>
            </Grid>

          </Grid>
        )
      }

    })
    setsumDish(summary)

    // dishArray.forEach((item) => {


    if (plus) {
      setTotal(total + Number(dishObject.price))
    }

    else {
      dishArray.forEach((itemp) => {
        if (itemp.name === dishObject.name && itemp.qty > -1) {
          setTotal(total - (Number(itemp.price)))
        }
      })
    }



    //     else if (total > 0 && total >= (Number(dishObject.price))) {
    // setTotal(total - (Number(dishObject.price)))
    // })





    //eslint-disable-next-line
  }, [dishArray])
  const customerName = (v) => {
    setbookingName(v.target.value)
  }
  const mobileNumber = (v) => {
    settelno(v.target.value)
  }
  const getDate = (v) => {
    let selDate = `${v.$D}/${v.$M + 1}/${v.$y}`
    setdate(selDate)
  }
  const getTime = (v) => {
    settime(`${v.$H}:${v.$m}`)
  }
  const persons = (v)=>{
    console.log(v.target.value)
    setPerson(v.target.value)
  }
  const combos = (v)=>{
    setCombo(v.target.value)
  }
  const instructions = (v)=>{
    setInstruction(v.target.value)
  }
  const sendOrderDetails = () => {
    const preorderDetails = dishArray.filter((items) => {
      return items.qty > 0;
    });
    console.log("i am orders array ", preorderDetails)
    let orderDetails = []
    prices.forEach((value, idx) => {
      preorderDetails.forEach((items) => {
        if (items.name === value.name) {
          console.log("i m item that matched", items.name, ":", items.qty)
          orderDetails.push({
            item: idx,
            qty: items.qty
          })
        }
      })
    })

    console.log(orderDetails)
    const sendData = async () => {
      try {
        console.log(`here is person value ${person}`)
        const response = await fetch(`${backend_link}/orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "customerDetails": {
              "bookingName": bookingName,
              "phoneNumber": String(telno)
            },
            "bookingDetails": {
              "date": date,
              "time": time,
              "person":person,
              "combo":combo,
              "instruction":instruction,
              "advance":(hotel.percent)*total
            },
            "restaurant": {
              "name": hotel.name,
              "code": hotel.id
            },
            "orderDetails": preorderDetails

          }),
          credentials: "include"
        });
        const data = await response.json();
        window.location.href=`/payment/${data[0]._id}`;
      } catch (error) {
      }
    }
    sendData();
  }


  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [reviewList,setReviewList] = useState([]);
  const [renderWindow, setRenderWindow] = useState(<></>);
  const [ratingOverall,setRatingOverall] = useState(0);
  const [ratingStaff,setRatingStaff] = useState(0);
  const [ratingFood,setRatingFood] = useState(0);
  const [ratingAmbience,setRatingAmbience] = useState(0);
  const [ratingServices,setRatingServices] = useState(0);

  const restroget = async()=>{
    try {
      const data = await fetch(`${backend_link}/restaurants/${hotel.id}`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const restaurant = await data.json();
      setRatingOverall(restaurant.restaurant.ratings.overall);
      setRatingStaff(restaurant.restaurant.ratings.staff);
      setRatingFood(restaurant.restaurant.ratings.food);
      setRatingAmbience(restaurant.restaurant.ratings.ambience);
      setRatingServices(restaurant.restaurant.ratings.services);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    restroget();
  },[])

  const reviewget = async()=>{
    try {
      const data = await fetch(`${backend_link}/reviews`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const review = await data.json();
      setReviewList(review);
    } catch (error) {
      console.log(error);
    }
      
      // setOrderList(["Harikrushna","Joker","Aashirwad"])
    }

    useEffect(()=>{
      reviewget();
    },[]);

    useEffect(()=>{
      const elements = reviewList.map((review) => {
        if(review.restaurant.name === hotel.name){
        const name = review.userDetails.username;
        return(<>
            <CardContent>
              <Card sx={{ boxShadow: "none" }} >
                <CardHeader
                  sx={{ padding: '0 0 0 0%' }}
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="avatar">
                      {name[0]}
                    </Avatar>
                  }
                  title={
                    <Typography variant="h7" fontWeight="700" >
                      {name}
                    </Typography>
                  }
                />
                <CardContent sx={{ padding: '0 0 0 0%', marginLeft: "3.5rem" }} >
                  {review.content}
                </CardContent>
              </Card>
            </CardContent>
        </>);
      }
      });
      setRenderWindow(elements);
    },[reviewList]);

  return (
    <>
      <Header />
      <Grid sx={{ display: { xs: "flex" }, marginTop: "7%", justifyContent: "space-evenly", flexWrap:'wrap' }} container spacing={0}>
        <Grid sx={{}} item md={6} xs={12}>

          <Card className='hpcarddiv' sx={{ width: '55vw', minWidth: "100%", maxWidth:'55vw' ,height: 'auto', borderRadius: '20px', boxShadow: 0 }}>

            <CCarousel controls interval={2000}>
              <CCarouselItem>
                <CImage className="d-block w-100" src={hotel.image} alt="slide 1" style={{height:'520px' ,maxHeight:'72vw'}} />
              </CCarouselItem>
              <CCarouselItem>
                <CImage className="d-block w-100" src={hotel.image2} alt="slide 2" style={{height:'520px' ,maxHeight:'72vw'}} />
              </CCarouselItem>
              <CCarouselItem>
                <CImage className="d-block w-100" src={hotel.image3} alt="slide 3" style={{height:'520px' ,maxHeight:'72vw'}} />
              </CCarouselItem>
              <CCarouselItem>
                <CImage className="d-block w-100" src={hotel.image4} alt="slide 4" style={{height:'520px' ,maxHeight:'72vw'}} />
              </CCarouselItem>
              <CCarouselItem>
                <CImage className="d-block w-100" src={hotel.image5} alt="slide 5" style={{height:'520px' ,maxHeight:'72vw'}} />
              </CCarouselItem>
              <CCarouselItem>
                <CImage className="d-block w-100" src={hotel.image6} alt="slide 6" style={{height:'520px' ,maxHeight:'72vw'}} />
              </CCarouselItem>
              <CCarouselItem>
                <CImage className="d-block w-100" src={hotel.image7} alt="slide 7" style={{height:'520px' ,maxHeight:'72vw'}} />
              </CCarouselItem>
              <CCarouselItem>
                <CImage className="d-block w-100" src={hotel.image8} alt="slide 8" style={{height:'520px' ,maxHeight:'72vw'}} />
              </CCarouselItem>
            </CCarousel>
            <CardHeader
              sx={{ paddingBottom: 0 }}

              title={
                <Grid container >
                  <Grid sx={{}} xs={10} >
                    <Typography variant="h5" fontWeight="700" >
                      {hotel.name}
                    </Typography>
                  </Grid>
                  <Grid sx={{ paddingLeft: "0%" }} xs={2} >
                    <Fab sx={{ boxShadow: "none",float:'right' }} color="primary" aria-label="add">
                      <Typography variant="h7" fontWeight="700" fontSize="20px"  >
                        {ratingOverall=== 0?"New":ratingOverall}
                      </Typography>
                    </Fab>
                  </Grid>

                </Grid>
              }
              subheader={
                <Grid sx={{ marginTop: "-2.5%" }} >
                  <Typography variant="h7" fontWeight="700" color="text.secondary"  >
                    {hotel.location}
                  </Typography>
                </Grid>
              }

            />
            <CardContent sx={{ paddingTop: 0 }}  >
              <Grid container spacing={0} sx={{marginTop:'10px'}}>
                <Grid xs={5.3} >
                  <Typography variant="body2" color="text.secondary" fontWeight="700"  >
                    Contact-{hotel.contact}
                  </Typography>
                </Grid>
                <Grid sx={{ paddingLeft: "0%" }} xs={6.7} >
                  <Typography variant="body2" color="text.secondary" fontWeight="700" sx={{float:'right'}}>
                    Flat <span style={{ color: "#2A88DF" }} >{hotel.discount}</span> off on the total bill
                  </Typography>
                </Grid>
              </Grid>
              {/* <Grid container > */}
                <Grid container sx={{ marginTop: "1%", alignItems: "center",display:'flex' }}>
                  <Grid sx={{ display: "flex", alignItems: "center", marginRight: "0%" }} xs={0.5}>
                    <img src='/images/map.png' style={{ width: "25px", height: "25px " }} alt='cuisine logo' />
                  </Grid>

                  <Grid xs={5.75}>
                    <Typography variant="body2" color="text.secondary" >
                      <Link style={{textDecoration:'none', color:'inherit',paddingLeft:'12px'}} to={hotel.direction}>Get directions on map</Link>
                    </Typography>
                  </Grid>
                  <Grid xs={5.75} sx={{paddingLeft:'25%'}}>
                    <Button sx={{float:'right',padding:'0px'}}><Link style={{backgroundColor:'#2a88df',borderRadius:'10px',textDecoration:'none',color:'white',fontWeight:'bold',width:'60px',padding:'5px' , '&:hover':{backgroundColor:'#257ccc'}}} to={hotel.menulink}>Menu</Link></Button>
                  </Grid>
                </Grid>
              {/* </Grid> */}
            </CardContent>


          </Card>

        </Grid>
        <Grid item md={4} xs={12} sx={{paddingLeft:'0px'}}>
          <Card sx={{ paddingLeft: "0%", marginLeft: "0%", width: '40vw',minWidth: "100%", maxWidth:'40vw', height: '525px', borderRadius: '20px', boxShadow: 0, backgroundColor:'white' }}>
            <CardHeader
              sx={{ marginTop: "0%", paddingBottom: 0 }}
              title={
                <Grid container sx={{ alignItems: "center" }} >
                  <Grid sx={{ display: "flex", alignItems: "center", marginRight: "1%" }} ><img src='/images/cuisine.png' style={{ width: "30px", height: "30px " }} alt='cuisine logo' /></Grid>
                  <Grid>
                    <Typography variant="h6" fontWeight="700" >
                      CUISINE
                    </Typography>
                  </Grid>
                </Grid>
              }
              subheader={
                <Typography sx={{ marginLeft: "36px" }} variant="h7" fontWeight="700" color="text.secondary"  >
                  {hotel.cuisine}
                </Typography>
              }
            />
            <CardHeader
              sx={{ marginTop: "10%", paddingBottom: 0 }}
              title={
                <Grid container sx={{ alignItems: "center" }} >
                  <Grid sx={{ display: "flex", alignItems: "center", marginRight: "1%" }} ><img src='/images/type.png' style={{ width: "30px", height: "30px " }} alt='cuisine logo' /></Grid>
                  <Grid>
                    <Typography variant="h6" fontWeight="700" >
                      TYPE
                    </Typography>
                  </Grid>
                </Grid>
              }
              subheader={
                <Typography sx={{ marginLeft: "36px" }} variant="h7" fontWeight="700" color="text.secondary"  >
                  {hotel.type}
                </Typography>
              }
            />
            <CardHeader
              sx={{ marginTop: "10%", paddingBottom: 0 }}

              title={
                <Grid container sx={{ alignItems: "center" }} >
                  <Grid sx={{ display: "flex", alignItems: "center", marginRight: "1%" }} ><img src='/images/facilities.png' style={{ width: "30px", height: "30px " }} alt='cuisine logo' /></Grid>
                  <Grid>
                    <Typography variant="h6" fontWeight="700" >
                      FACILITIES
                    </Typography>
                  </Grid>
                </Grid>
              }
              subheader={
                <Grid container sx={{ alignItems: "center" }}>
                  <Grid container xs={5} sx={{ marginTop: "3%" }} >
                    <Grid sx={{ display: "flex", alignItems: "center", marginRight: "3%", marginLeft: "36px" }} ><img src='/images/wifi.png' style={{ width: "25px", height: "25px " }} alt='cuisine logo' /></Grid>
                    <Grid>
                      <Typography variant="h7" fontWeight="700" >
                        Wifi
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container xs={7} sx={{ marginTop: "3%" }}>
                    <Grid sx={{ display: "flex", alignItems: "center", marginRight: "0%", marginLeft: "36px" }} ><img src='/images/ac.png' style={{ width: "25px", height: "25px " }} alt='cuisine logo' /></Grid>
                    <Grid>
                      <Typography variant="h7" fontWeight="700" >
                        Air Conditioned
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container xs={5} sx={{ marginTop: "3%" }}>
                    <Grid sx={{ display: "flex", alignItems: "center", marginRight: "3%", marginLeft: "36px" }} ><img src='/images/car.png' style={{ width: "25px", height: "25px " }} alt='cuisine logo' /></Grid>
                    <Grid>
                      <Typography variant="h7" fontWeight="700" >
                        Parking
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container xs={7} sx={{ marginTop: "3%" }}>
                    <Grid sx={{ display: "flex", alignItems: "center", marginRight: "3%", marginLeft: "36px" }} ><img src='/images/serving.png' style={{ width: "25px", height: "25px " }} alt='cuisine logo' /></Grid>
                    <Grid>
                      <Typography variant="h7" fontWeight="700" >
                        Serving
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

              }
            />
            <CardHeader
              sx={{ marginTop: "10%", paddingBottom: 0 }}
              title={
                <Grid container sx={{ alignItems: "center" }} >
                  <Grid sx={{ display: "flex", alignItems: "center", marginRight: "1%" }} ><img src='/images/type.png' style={{ width: "30px", height: "30px " }} alt='cuisine logo' /></Grid>
                  <Grid>
                    <Typography variant="h6" fontWeight="700" >
                      AVERAGE COST
                    </Typography>
                  </Grid>
                </Grid>
              }
              subheader={

                <Typography sx={{ marginLeft: "36px" }} variant="h7" fontWeight="700" color="text.secondary"  >
                  {hotel.costavg}
                </Typography>
              }
            />
          </Card>
        </Grid>
      </Grid>


      <Grid className='formdiv' sx={{width: '100%', minWidth: "100%", marginTop: "2%",display:'flex',flexWrap:'wrap', justifyContent: "space-evenly" }} container  >
            <Grid className='toset' item>
              <Grid><Typography item sx={{}} variant="h6" fontWeight="700" >
                Booking Details
              </Typography></Grid>
              <Grid style={{ marginBottom: "2rem" }}><TextField onChange={customerName} name='fullname' type='text' id="outlined-basic" label="Full Name" variant="outlined" style={{ width: "330px" }} /></Grid>
              <Grid><TextField onChange={mobileNumber} name="number" type='tel' id="outlined-basic" label="Mobile Number" variant="outlined" style={{ width: "330px" }} /></Grid>
            </Grid>
            <Grid className='toset' item sx={{ borderRadius: "20px"}} >
              <Typography variant="h6" fontWeight="700">
                Date
              </Typography>
              <DatePick forValue={getDate} />
              <Grid sx={{marginTop:'2rem'}}><TextField onChange={persons} name="persons" type='number' id="outlined-basic" label="Adults" variant="outlined" style={{ width: "100px" }} /><TextField onChange={instructions} name="instruction" type='text' id="outlined-basic" label="Jain Food, Other Instruction" variant="outlined" style={{ width: "210px" }} sx={{marginLeft:'20px'}} /></Grid>
            </Grid>
            <Grid className='toset' item>
              <Typography variant="h6" fontWeight="700">
                Time Slot
              </Typography>
              <Timepick sx={{minWidth:'372px'}} forValue={getTime} />
              <Grid sx={{marginTop:'2rem'}}><TextField onChange={combos} name="combo" type='text' id="outlined-basic" label="Enter Combo Choices if Selected" variant="outlined" style={{ width: "330px" }} defaultValue={"No"} /></Grid>
            </Grid>
      </Grid>
      <Grid sx={{ display: { xs: "flex" }, marginTop: "4%", justifyContent: "space-evenly", flexWrap:'wrap',padding:'0px 15px' }} container spacing={2}>
        <Grid item xs={12} md={6} sx={{maxHeight:'700px',overflowY:'scroll', marginTop:'1%'}}>
          <div>
            {Object.keys(hotel.menu).map((item, index) => {
              const panel = "panel" + String(index + 1)
              return (
                <Accordion expanded={expanded === panel} onChange={handleChange(panel)}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                  >
                    <Typography Typography variant="h6" fontWeight="700" sx={{ width: '33%', flexShrink: 0 }}>
                      {item}
                    </Typography>
                  </AccordionSummary>
                  {(Object.keys(Object.values(hotel.menu)[i++])).map((type, index) => {
                    let k = i - 1;
                    let dishID = "dishtype" + String(type);
                    return (
                      <AccordionDetails>
                        <Grid container sx={{ justifyContent: "center", alignItems: "center" }} >
                          <Grid id={dishID} xs={6} sx={{ textAlign: "left",overflow:'scroll'}} >
                            {type}
                          </Grid>
                          <Grid xs={3} sx={{ textAlign: "center" }} >
                            {Object.values(Object.values(hotel.menu)[k])[index]}
                          </Grid>
                          <Grid xs={3} sx={{ display: "flex", justifyContent: "right" }} >
                            <AddCircleIcon
                              onClick={() => {
                                setPlus(true)
                                setDishObject({
                                  name: String(type),
                                  qty: 1,
                                  price: String(Object.values(Object.values(hotel.menu)[k])[index])
                                })
                              }
                              }
                              fontSize='large' sx={{
                                '&:hover': {

                                  color: "#2a8fff"
                                }, cursor: "pointer", color: '#2a88df'
                              }} />{ }
                            <RemoveCircleIcon onClick={() => {
                              setPlus(false)
                              setDishObject({
                                name: String(type),
                                qty: 1,
                                price: String(Object.values(Object.values(hotel.menu)[k])[index])
                              })
                            }}
                              fontSize='large' sx={{
                                '&:hover': {

                                  color: "#2a8fff"
                                }, cursor: "pointer", color: '#2a88df'
                              }} />
                          </Grid>
                        </Grid>
                      </AccordionDetails>
                    )
                  })}
                </Accordion>
              )
            })}
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ padding: "0% ", marginLeft: "0%", width: '100%', height: '700px', borderRadius: '20px', boxShadow: 0, display: "flex", flexDirection: "column" }}>
            <CardHeader
              sx={{ backgroundColor: "#2A88DF", borderRadius: "20px", color: "white",width:'100%' }}
              title={
                <Typography variant="h5" fontWeight="700" >
                  Order Summary
                </Typography>
              }
              subheader={
                <Grid sx={{ textAlign: "center", color: "white" }} container >
                  <Grid xs={4}>
                    <Typography variant="h7" fontWeight="700" >
                      Item
                    </Typography>
                  </Grid>
                  <Grid xs={4}>
                    <Typography variant="h7" fontWeight="700" >
                      Quantity
                    </Typography>
                  </Grid>
                  <Grid xs={4}>
                    <Typography variant="h7" fontWeight="700" >
                      Price
                    </Typography>
                  </Grid>
                </Grid>
              }
            />
            <CardContent sx={{ maxHeight: "470px", overflow: "auto" }} >
              {sumDish}
            </CardContent>
            <CardContent sx={{ color: "#2a88df", marginTop: "auto" }} >
              <Grid sx={{ color: "#282828", marginBottom: "2%" }} container >
                <Grid xs={4}>
                  <Typography variant="h5" fontWeight="700" >
                    Total
                  </Typography>
                </Grid>
                <Grid sx={{ marginLeft: "auto", textAlign: "center" }} xs={4}>
                  <Typography variant="h5" fontWeight="700" >
                    {total}
                  </Typography>
                </Grid>
              </Grid>
              <Grid sx={{ color: "#282828", marginBottom: "2%" }} container >
                <Grid xs={4}>
                  <Typography variant="h5" fontWeight="700" >
                    Advance
                  </Typography>
                </Grid>
                <Grid sx={{ marginLeft: "auto", textAlign: "center" }} xs={4}>
                  <Typography variant="h5" fontWeight="700" >
                    {0.2 * total}
                  </Typography>
                </Grid>
              </Grid>
              <Grid sx={{ color: "#282828", marginBottom: "2%" }} container >
                <Grid xs={4}>
                  <Typography variant="h5" fontWeight="700" >
                    Remaining
                  </Typography>
                </Grid>
                <Grid sx={{ marginLeft: "auto", textAlign: "center" }} xs={4}>
                  <Typography variant="h5" fontWeight="700" >
                    {total - (0.2 * total)}
                  </Typography>
                </Grid>
              </Grid>
              <Grid sx={{ color: "#282828", marginBottom: "2%" }} container >
                <Grid xs={8}>
                  <Typography variant="h7" fontWeight="400" >
                    Pay 20% to confirm your order. <br />Discount will be done at restaurant.
                  </Typography>
                </Grid>
                <Grid sx={{ marginLeft: "auto", textAlign: "center" }} xs={4}>
                  <Link onClick={sendOrderDetails} style={{textDecoration:'none'}}>
                    <MenuItem className='' sx={{
                      justifyContent: "center",
                      color: '#fff',
                      backgroundColor: "#2A88DF",
                      borderRadius: "20px",
                      padding: "8px 20px 8px 20px",
                      fontFamily: 'Jost',
                      fontWeight: '700',
                      '&:hover': {
                        backgroundColor: '#2475bf',
                      }
                    }} >Pay {0.2 * total} </MenuItem></Link>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container sx={{ display: { xs: "flex" }, marginTop: "5%", justifyContent: "space-evenly", marginLeft: { xs: "0%", md: "0%" } }} spacing={0} >
        <Grid item xs={12} md={6} sx={{minHeight:'300px',maxHeight:'427px',overflowY:'scroll'}}>
        <Card sx={{ width: 'auto', minWidth: "100%", height: 'auto', borderRadius: '20px', boxShadow: 0 }}>
            <CardHeader sx={{ backgroundColor: "white", color: "#2A88DF", marginLeft: "0%" }}
              title={
                <Grid container >
                  <Typography variant="h5" fontWeight="700" >
                    Top Reviews
                  </Typography>
                  <MenuItem sx={{
                    color: '#fff',
                    backgroundColor: "#2A88DF",
                    borderRadius: "10px",
                    width: "auto",
                    display: "flex",
                    fontFamily: 'Jost',
                    fontWeight: '700',
                    ml: 'auto',
                    '&:hover': {
                      backgroundColor: '#2475bf',
                    }
                  }} ><Link style={{ textDecoration: 'none', color: "#fff" }} to={`/reviews/${hotel.id}`} >Add Review</Link></MenuItem>
                </Grid>
              }
            />
          {renderWindow}
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ paddingLeft: "4%",paddingRight:'4%', marginLeft: "0%", width: '100%', height: '300px', borderRadius: '20px', boxShadow: 0 }} >
              
                <CardHeader sx={{ backgroundColor: "white", color: "#2A88DF", padding: "4% 0 2% 0%" }}
                  title={
                    <Typography variant="h7" fontWeight="700" >
                      Staff
                    </Typography>
                  }
                />
                <CardContent sx={{ padding: "0px 0px 0px 0%" }} >
                  <LinearProgress color="primary" variant="determinate" value={ratingStaff*20} />
                </CardContent>
                <CardHeader sx={{ backgroundColor: "white", color: "#2A88DF", padding: "5% 0 2% 0%" }}
                  title={
                    <Typography variant="h7" fontWeight="700" >
                      Food
                    </Typography>
                  }
                />
                <CardContent sx={{ padding: "0px 0px 0px 0%" }} >
                  <LinearProgress color="primary" variant="determinate" value={ratingFood*20} />
                </CardContent>
                <CardHeader sx={{ backgroundColor: "white", color: "#2A88DF", padding: "5% 0 2% 0%" }}
                  title={
                    <Typography variant="h7" fontWeight="700" >
                      Ambience
                    </Typography>
                  }
                />
                <CardContent sx={{ padding: "0px 0px 0px 0%" }} >
                  <LinearProgress color="primary" variant="determinate" value={ratingAmbience*20} />
                </CardContent>
                <CardHeader sx={{ backgroundColor: "white", color: "#2A88DF", padding: "5% 0 2% 0%" }}
                  title={
                    <Typography variant="h7" fontWeight="700" >
                      Services
                    </Typography>
                  }
                />
                <CardContent sx={{ padding: "0px 0px 0px 0%" }} >
                  <LinearProgress color="primary" variant="determinate" value={ratingServices*20} />
                </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Footer />
    </>
  )
}
export default Hotelpage









