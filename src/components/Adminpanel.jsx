import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useState } from "react";
import { Alert, AlertTitle } from '@mui/material';
import Hotellist from "./Hotellist";
import { useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import sound from './sound.mp3';
import { io } from "socket.io-client";
import backend_link from '../links'

const socket = io.connect("https://dotrestros.com"); //backend_link

const Adminpanel = () => {

    const { code } = useParams()

    const hotel = Hotellist.find((h) => {
        return (
            String(h.code) === code
        )
    })

    const [orderList, setOrderList] = useState([]);
    const [renderWindow, setRenderWindow] = useState(<></>);
    const [open, setOpen] = useState(false);
    const [activate, setActivate] = useState(false);
    const [audio, setAudio] = useState(new Audio(sound));

    const handleClickOpen = () => {
        setOpen(true);
        audio.play();
    };

    const handleClose = () => {
        setOpen(false);
        audio.pause();
        setAudio(new Audio(sound));
    };

    const token = localStorage.getItem('token');
    const orderGet = async () => {
        try {
            const data = await fetch(`${backend_link}/orders`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `BEARER:${token}`
                },
            });
            const order = await data.json();
            setOrderList(order);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        orderGet();
        console.log("Use effect");
    }, []);

    socket.on('check', (data) => {
        console.log("this is the data ", data);
        handleClickOpen();
        orderGet();
        console.log("Socket");
        socket.off();
    })

    useEffect(() => {
        const elements = orderList.map((order) => {
            const items = order.orderDetails.map((a) => {
                return (<>
                    <Grid sx={{ width: '100%', textAlign: 'center', padding: '0px 15px' }}>{a.qty} {a['name']}</Grid>
                </>);
            });
            if (order.restaurant.name === hotel.name) {
                return (<>
                    <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '5px 0px', borderBottom: '1px solid black' }}>
                        <Grid sx={{ width: '10%', textAlign: 'center' }}>{order.customerDetails.bookingName}</Grid>
                        <Grid sx={{ width: '10%', textAlign: 'center' }}>{order.customerDetails.phoneNumber}</Grid>
                        <Grid sx={{ width: '10%', textAlign: 'center' }}>{order.bookingDetails.date}</Grid>
                        <Grid sx={{ width: '10%', textAlign: 'center' }}>{order.bookingDetails.time}</Grid>
                        <Grid sx={{ width: '10%', textAlign: 'center' }}>{order.bookingDetails.person}</Grid>
                        <Grid sx={{ width: '10%', textAlign: 'center' }}>{order.bookingDetails.advance}</Grid>
                        <Grid sx={{ width: '10%', textAlign: 'center' }}>
                            {order.cancelled ? <Alert severity="warning" sx={{ paddingLeft: '10px', paddingRight: '10px' }}>
                                <AlertTitle sx={{ fontSize: '17px', marginBottom: '0px' }}>Cancelled</AlertTitle>
                            </Alert> :
                                <Alert severity="success" sx={{ paddingLeft: '10px', paddingRight: '10px' }}>
                                    <AlertTitle sx={{ fontSize: '17px', marginBottom: '0px' }}>Accepted</AlertTitle>
                                </Alert>}
                        </Grid>
                        <Grid sx={{ width: '30%' }}>
                            <Grid sx={{ width: '100%', textAlign: 'center', padding: '0px 15px' }}>Instruction-{order.bookingDetails.instruction} Combo-{order.bookingDetails.combo}</Grid>
                            {items}
                        </Grid>
                    </Grid>
                </>);
            }
            return (<></>);
        });
        setRenderWindow(elements);
    }, [orderList,hotel.name]);

    return (
        <>
            <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 60px' }}>
                <Grid sx={{ width: '8%' }}>
                    <img src="/images/LOGO.png" alt="" style={{ width: '100%', height: 'auto' }} />
                </Grid>
                <Grid sx={{ textAlign: 'right' }}>
                    <Typography sx={{ fontSize: '25px', fontFamily: 'sans-serif', color: '#2a88df', fontWeight: 'bold', textDecoration: 'underline' }}>{hotel.name}</Typography>
                    {!activate ? <Button onClick={() => {
                        setActivate(true);
                    }} sx={{ fontSize: '17px', fontWeight: '400', color: 'red' }}>Click to Activate</Button>
                :<Button sx={{ fontSize: '17px', fontWeight: '400', color: 'green' }}>Activated</Button>}
            </Grid>
            <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Use Google's location service?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {/* {orderList.bookingDetails.date}
                        {orderList.bookingDetails.time}
                        {orderList.bookingDetails.person}
                        {orderList.bookingDetails.advance} */}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{ color: 'red' }}>Decline</Button>
                    <Button onClick={handleClose} autoFocus sx={{ fontWeight: 'bold' }}>
                        Accept
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid >
            <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 60px', marginTop: '30px' }}>
                <Grid sx={{ width: '22%', height: '100px', backgroundColor: '#257ccc', borderRadius: '5px' }}>
                    <Typography sx={{ color: 'white', margin: '10px 15px', fontSize: '20px', fontFamily: 'sans-serif', fontWeight: '100' }}>
                        Total Orders
                    </Typography>
                    <Grid sx={{ margin: '-5px 0px 0px 35px', color: 'white', fontSize: '30px', fontWeight: 'bold' }}>{orderList.length}</Grid>
                </Grid>
                <Grid sx={{ width: '22%', height: '100px', backgroundColor: '#257ccc', borderRadius: '5px' }}>
                    <Typography sx={{ color: 'white', margin: '10px 15px', fontSize: '20px', fontFamily: 'sans-serif', fontWeight: '100' }}>
                        Accepted Orders
                    </Typography>
                    <Grid sx={{ margin: '-5px 0px 0px 35px', color: 'white', fontSize: '30px', fontWeight: 'bold' }}>10</Grid>
                </Grid>
                <Grid sx={{ width: '22%', height: '100px', backgroundColor: '#257ccc', borderRadius: '5px' }}>
                    <Typography sx={{ color: 'white', margin: '10px 15px', fontSize: '20px', fontFamily: 'sans-serif', fontWeight: '100' }}>
                        Declined Orders
                    </Typography>
                    <Grid sx={{ margin: '-5px 0px 0px 35px', color: 'white', fontSize: '30px', fontWeight: 'bold' }}>0</Grid>
                </Grid>
                <Grid sx={{ width: '22%', height: '100px', backgroundColor: '#257ccc', borderRadius: '5px' }}>
                    <Typography sx={{ color: 'white', margin: '10px 15px', fontSize: '20px', fontFamily: 'sans-serif', fontWeight: '100', }}>
                        Last Month Orders
                    </Typography>
                    <Grid sx={{ margin: '-5px 0px 0px 35px', color: 'white', fontSize: '30px', fontWeight: 'bold' }}>10</Grid>
                </Grid>
            </Grid>
            <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 60px', marginTop: '30px' }}>
                <Grid sx={{ width: '22%', height: '100px', backgroundColor: '#257ccc', borderRadius: '5px' }}>
                    <Typography sx={{ color: 'white', margin: '10px 15px', fontSize: '20px', fontFamily: 'sans-serif', fontWeight: '100' }}>
                        Processed Orders
                    </Typography>
                    <Grid sx={{ margin: '-5px 0px 0px 35px', color: 'white', fontSize: '30px', fontWeight: 'bold' }}>10</Grid>
                </Grid>
                <Grid sx={{ width: '22%', height: '100px', backgroundColor: '#257ccc', borderRadius: '5px' }}>
                    <Typography sx={{ color: 'white', margin: '10px 15px', fontSize: '20px', fontFamily: 'sans-serif', fontWeight: '100' }}>
                        Cancelled Orders
                    </Typography>
                    <Grid sx={{ margin: '-5px 0px 0px 35px', color: 'white', fontSize: '30px', fontWeight: 'bold' }}>0</Grid>
                </Grid>
                <Grid sx={{ width: '22%', height: '100px', backgroundColor: '#257ccc', borderRadius: '5px' }}>
                    <Typography sx={{ color: 'white', margin: '10px 15px', fontSize: '20px', fontFamily: 'sans-serif', fontWeight: '100' }}>
                        Pending Orders
                    </Typography>
                    <Grid sx={{ margin: '-5px 0px 0px 35px', color: 'white', fontSize: '30px', fontWeight: 'bold' }}>0</Grid>
                </Grid>
                <Grid sx={{ width: '22%', height: '100px', backgroundColor: '#257ccc', borderRadius: '5px' }}>
                    <Typography sx={{ color: 'white', margin: '10px 15px', fontSize: '20px', fontFamily: 'sans-serif', fontWeight: '100', }}>
                        Total Revenue
                    </Typography>
                    <Grid sx={{ margin: '-5px 0px 0px 35px', color: 'white', fontSize: '30px', fontWeight: 'bold' }}>10000</Grid>
                </Grid>
            </Grid>
            <Grid sx={{ marginTop: '30px', padding: '10px 60px' }}>
                <Typography sx={{ backgroundColor: '#257ccc', color: 'white', fontWeight: '400', fontSize: '20px', paddingLeft: '15px', borderRadius: '5px', height: '40px', display: 'flex', alignItems: 'center' }}>Orders List</Typography>
                <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '5px 0px', borderBottom: '1px solid black' }}>
                    <Grid sx={{ width: '10%', textAlign: 'center', fontWeight: 'bold' }}>Name</Grid>
                    <Grid sx={{ width: '10%', textAlign: 'center', fontWeight: 'bold' }}>Contact</Grid>
                    <Grid sx={{ width: '10%', textAlign: 'center', fontWeight: 'bold' }}>Date</Grid>
                    <Grid sx={{ width: '10%', textAlign: 'center', fontWeight: 'bold' }}>Time</Grid>
                    <Grid sx={{ width: '10%', textAlign: 'center', fontWeight: 'bold' }}>Adults</Grid>
                    <Grid sx={{ width: '10%', textAlign: 'center', fontWeight: 'bold' }}>Advance</Grid>
                    <Grid sx={{ width: '10%', textAlign: 'center', fontWeight: 'bold' }}>Status</Grid>
                    <Grid sx={{ width: '30%', textAlign: 'center', fontWeight: 'bold' }}>Order</Grid>
                </Grid>
                {renderWindow}
            </Grid>
        </>
    )
}

export default Adminpanel;