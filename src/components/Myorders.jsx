import React, { useEffect, useState } from "react";
import Header from "./Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import backend_link from '../links'
import { Link, useParams } from "react-router-dom";
import { Rating } from "@mui/material";
import Footer from "./Footer";
import Hotellist from "./Hotellist"


const MyOrders = () => {
  const [orderList, setOrderList] = useState([]);
  const [renderWindow, setRenderWindow] = useState(<></>);
//   useEffect(async () => {
//     // const data = await fetch(`${backend_link}/user/profile`, {
//     //   method: "GET",
//     //   headers: {
//     //     "Content-Type": "application/json",
//     //   },
//     //   credentials: "include",
//     // });
//     // const user = await data.json();
//     // setOrderList(user.orders);
//     setOrderList(["Harikrushna Restaurant","Joker Restaurant","Aashirwad Restaurant"]);
// }, []);


  const orderget = async()=>{
    try {
      const data = await fetch(`${backend_link}/user/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const user = await data.json();
      setOrderList(user.orders);
    } catch (error) {
      console.log(error);
    }
      
      // setOrderList(["Harikrushna","Joker","Aashirwad"])
    }

  useEffect(()=>{
    orderget();
  },[]);

  useEffect(() => {
    

    const elements = orderList.map((order) => {
      
      const hotel = Hotellist.find((h) => {
        return (
          String(h.name) === order.restaurant.name
        )
      })
        return (
            <>
            
              {/* <h1>{order.bookingDetails.time}</h1> */}
            <div className="maindiv">
                <div className="img">
                    <img src={hotel.image} alt="" />
                </div>
                <div className="details">
                    <div className="info">
                      <h3 className="name">{hotel.name}</h3>
                      <div className="test">
                        <div className="testf">
                          <span>{hotel.rating}</span>
                          <Rating name="read-only" sx={{color:'white'}} value={1} max={1} readOnly />
                        </div>
                      </div>
                      <h5 className="address">{hotel.location}</h5>
                      <h6 className="contact">{hotel.contact}</h6>
                      <h6 className="offer">Flat <span className="per">{hotel.discount}</span> off on total bill</h6>
                      <h6 className="direction"><Link to={hotel.direction} style={{textDecoration:'none', color:'#2a88df'}}>Get direction on map</Link></h6>
                    </div>
                    <div className="action">
                        <Link className="btn" to={hotel.menulink}>Menu</Link>
                        <Link className="btn" to={`/reviews`}>Add Review</Link>
                        <Link className="btn" to={`${backend_link}/orders/cancel/${order._id}`}>Cancel</Link>
                    </div>
                </div>
            </div>
            </>
          );
      
    });
    setRenderWindow(elements);
  }, [orderList]);

  return (
    <>
    <style>
            {`
                .maindiv{
                    border-top:2px solid #2a88df;
                    border-bottom:2px solid #2a88df;
                    margin-top:80px;
                    margin-bottom:80px;
                    margin-left:15%;
                    width:70%;
                    height:170px;
                    border-radius:10px 0px 0px 10px;
                    display:flex;
                    justify-content:space-between;
                }
                .img{
                  width:30%;
                  height:100%;
                }
                img{
                  width:100%;
                  height:100%;
                  border-radius:10px 0px 0px 10px;
                }
                .details{
                  display:flex;
                  justify-content:space-between;
                  width:70%;
                  height:100%;
                }
                .info{
                  padding-left:15px;
                  padding-top:10px;
                }
                .action{
                    display:flex;
                    flex-direction:column;
                    justify-content:space-evenly;
                    align-items:center;
                    flex-wrap:wrap;
                }
                .btn{
                    background-color:#2a88df;
                    padding:4px;
                    border:2px solid #2a88df;
                    border-radius:30px;
                    width:150px;
                    color:white;
                    font-size:20px;
                    font-weight:500;
                    transition:0.3s;
                }
                .btn:hover{
                    background-color:white;
                    border:2px solid #2a88df;
                    color:#2a88df;
                }
                .name{
                  display:inline-block;
                  margin-right:20px;
                }
                .test{
                  display:inline-block;
                  background-color:#2a88df;
                  color:white;
                  font-size:20px;
                  padding:0px 10px;
                  border-radius:5px;
                }
                .testf{
                  display:flex;
                  align-items:center;
                  justify-content:center;
                }
                @media (max-width:550px){
                  .maindiv{
                    flex-direction:column;
                    height:520px;
                    width:90%;
                    margin-left:5%;
                    border-top:0px;
                  }
                  .details{
                    flex-direction:column;
                  }
                  .img{
                    width:100%;
                    height:50%;
                  }
                  .details{
                    width:100%;
                  }
                  .name{
                    margin-right:0px;
                    display:block;
                  }
                  img{
                    border-radius:10px 10px 10px 10px;
                  }
                  h6,.address{
                    margin-top:5px;
                  }
                  .info{
                    padding-left:5px;
                  }
                  .action{
                    display:flex;
                    flex-direction:row;
                    justify-content:space-evenly;
                    align-items:center;
                    flex-wrap:wrap;
                }
                .btn{
                  width:120px;
                  font-size:17px;
                  margin-bottom:10px;
              }
                }
            `}
        </style>
      <Header />
      {renderWindow}
      <Footer />
    </>
  );
};

export default MyOrders;