import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Input, Rating, Button} from '@mui/material';
import axios from "axios";

function Reviews(){
    const [review,setReview] = useState('');
    const [rating,setRating] = useState({
        overall:0,
        staff: 0,
        food: 0,
        ambience: 0,
        services: 0,
    });

    const addreview = async () => {
        const data = {
          restaurant: {
            name: "Testing Review",
            code: 3,
          },
          content: review,
          ratings: {
            overall: rating.overall,
            staff: rating.staff,
            food: rating.food,
            ambience: rating.ambience,
            services: rating.services,
          },
        };
        try {
          console.log("reviews reached here");
          const res = await fetch("http://localhost:4000/reviews/create", {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data),
            credentials: "include",
          });
          if (res) {
            const reviewData = await res.json();
            console.log("data sent", reviewData);
          }
        } catch (error) {
          console.log(error);
        }
        setReview('');
        setRating({
            overall:0,
            staff: 0,
            food: 0,
            ambience: 0,
            services: 0,
        });
      };

    return(
        <>
        <style>
            {`
            .main{
            background-color:#282828;
            width:100%;
            height:140vh;
            margin-top:65px;
            display:flex;
            flex-direction:column;
            justify-content:space-evenly;
            align-items:center;
            }
            .heading,.ratings,.write{
                color:white;
                text-align:center;
            }

            .row{
                display:flex;
            }

            .tags{
                font-size:25px;
            }

            .write{
                width:100%;
            }
            @media (max-width:950px){
                .writebox{
                    width:90%;
                }
            }

            `}
        </style>
        <Header />
        <div className="main">
            <div className="heading">
                <h1 className="tagline">How was your Dawat?</h1>
                <h2 className="tagline2">Your precious reviews matter here...</h2>
            </div>
            <div className="ratings">
                <div className="overall row">
                    <h5 className="tags">Overall</h5>
                    <div className="stars">
                    <Rating value={rating.overall} onChange={(e)=>setRating({...rating,overall:e.target.value})} size='large' name="half-rating" defaultValue={0} precision={1} sx={{fontSize:'50px','& .MuiRating-icon':{color:'#2a88df'}}} required/>
                    </div>
                </div>
                <div className="staff row">
                    <h5 className="tags">Staff</h5>
                    <div className="stars">
                    <Rating value={rating.staff} onChange={(e)=>setRating({...rating,staff:e.target.value})} size='large' name="half-rating" defaultValue={0} precision={1} sx={{fontSize:'50px','& .MuiRating-icon':{color:'#2a88df'}}} required/>
                    </div>
                </div>
                <div className="food row">
                    <h5 className="tags">Food</h5>
                    <div className="stars">
                    <Rating value={rating.food} onChange={(e)=>setRating({...rating,food:e.target.value})} size='large' name="half-rating" defaultValue={0} precision={1} sx={{fontSize:'50px','& .MuiRating-icon':{color:'#2a88df'}}} required/>
                    </div>
                </div>
                <div className="ambience row">
                    <h5 className="tags">Ambience</h5>
                    <div className="stars">
                    <Rating value={rating.ambience} onChange={(e)=>setRating({...rating,ambience:e.target.value})} size='large' name="half-rating" defaultValue={0} precision={1} sx={{fontSize:'50px','& .MuiRating-icon':{color:'#2a88df'}}} required/>
                    </div>
                </div>
                <div className="services row">
                    <h5 className="tags">Services</h5>
                    <div className="stars">
                    <Rating value={rating.services} onChange={(e)=>setRating({...rating,services:e.target.value})} size='large' name="half-rating" defaultValue={0} precision={1} sx={{fontSize:'50px','& .MuiRating-icon':{color:'#2a88df'}}} required/>
                    </div>
                </div>
            </div>
            <div className="write">
                <h2 className="writearea">Write your experience here.</h2>
                <Input
                    className="writebox"
                    value={review}
                    onChange={(e)=>setReview(e.target.value)}
                    id="filled-multiline-static"
                    label="Review"
                    color="primary"
                    placeholder="Write your experience here"
                    multiline
                    rows={6}
                    defaultValue=""
                    variant="filled"
                    sx={{width:'40%', color:'white', marginTop:'30px'}}
                    required
                />
            </div>
            <Button onClick={addreview} variant="contained" style={{color:'white',textDecoration:'none'}}>Submit</Button>
        </div>
        <Footer />
        </>
    )
}

export default Reviews