import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Input, Rating, Button} from '@mui/material';
import axios from "axios";

function Reviews(){
    const [review,setReview] = useState('')

    const addreview = async () => {
        const user = {

        }
        const data = {
            userDetails:{
                username:"",
                userId:""
            },
            content:review
        }
        try {
            const res = await axios.post('',user,data)
            if(res){
                console.log('data sent')
            }
        } catch (error) {
            console.log(error)
        }

    }

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
                width:500px;
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
                    <Rating size='large' name="half-rating" defaultValue={0} precision={1} sx={{fontSize:'50px','& .MuiRating-icon':{color:'#2a88df'}}}/>
                    </div>
                </div>
                <div className="staff row">
                    <h5 className="tags">Staff</h5>
                    <div className="stars">
                    <Rating size='large' name="half-rating" defaultValue={0} precision={1} sx={{fontSize:'50px','& .MuiRating-icon':{color:'#2a88df'}}}/>
                    </div>
                </div>
                <div className="food row">
                    <h5 className="tags">Food</h5>
                    <div className="stars">
                    <Rating size='large' name="half-rating" defaultValue={0} precision={1} sx={{fontSize:'50px','& .MuiRating-icon':{color:'#2a88df'}}}/>
                    </div>
                </div>
                <div className="ambience row">
                    <h5 className="tags">Ambience</h5>
                    <div className="stars">
                    <Rating size='large' name="half-rating" defaultValue={0} precision={1} sx={{fontSize:'50px','& .MuiRating-icon':{color:'#2a88df'}}}/>
                    </div>
                </div>
                <div className="services row">
                    <h5 className="tags">Services</h5>
                    <div className="stars">
                    <Rating size='large' name="half-rating" defaultValue={0} precision={1} sx={{fontSize:'50px','& .MuiRating-icon':{color:'#2a88df'}}}/>
                    </div>
                </div>
            </div>
            <div className="write">
                <h2 className="writearea">Write your experience here.</h2>
                <Input
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
                    sx={{width:'100%', color:'white', marginTop:'30px'}}
                />
            </div>
            <Button onClick={addreview} variant="contained" style={{color:'white',textDecoration:'none'}}>Submit</Button>
        </div>
        <Footer />
        </>
    )
}

export default Reviews