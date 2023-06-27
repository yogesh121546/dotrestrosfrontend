import React, { useEffect, useState } from "react";
import Header from "./Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import backend_link from '../links'
import Footer from "./Footer";
const MyOrders = () => {
  const [orderList, setOrderList] = useState([]);
  const [renderWindow, setRenderWindow] = useState(<></>);
  useEffect(async () => {
    const data = await fetch(`${backend_link}/user/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const user = await data.json();
    setOrderList(user.orders);
  }, []);

  useEffect(() => {
    console.log("Order List: ", orderList);
    const elements = orderList.map((order) => {
      return (
        <>
          <h1>{order.bookingDetails.time}</h1>
        </>
      );
    });
    setRenderWindow(elements);
  }, [orderList]);

  return (
    <>
      <Header />
      {renderWindow}
      <Footer />
    </>
  );
};

export default MyOrders;