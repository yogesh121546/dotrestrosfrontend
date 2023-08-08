import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Box, Typography, Grid, Stack } from "@mui/material";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <style>
        {
          `.ftxt1{
            color:#fff;
            text-align:start;
            font-size:16px;
          }
          .ftxt2{
            font-size:25px;
          }
          .ftxt3{
            margin-top:5%;
          }
          .fimg1{
            width: 100%;
            height: 53%;
          }
          @media only screen and (max-width: 900px) {
            .ftxt1{
              font-size:15px;
            }
            .ftxt2{
              font-size:20px;
            }
            .ftxt3{
              font-size:12px;
            }
            & svg{
              transform: scale(0.75);
            }
            .fimg1{
              margin-left: 2%;
            }
          }
          @media only screen and (max-width: 768px) {
            .ftxt1{
              font-size:12px;
            }
            .ftxt2{
              font-size:16px;
            }
            .ftxt3{
              font-size:8px;
            }
            .fimg1{
              height:40%;
              margin-left:4%;
            }
            // & svg{
            //   transform: scale(0.5);
            // }
          }
          @media only screen and (max-width: 550px) {
            .ftxt1{
              font-size:10px;
            }
            .ftxt2{
              font-size:12px;
            }
            .ftxt3{
              font-size:8px;
            }
          }
          @media only screen and (max-width: 450px) {
            .maindiv{
              display:flex;
              flex-direction:column;
              justify-content:space-evenly;
              flex-wrap:wrap;
              padding:20px 0px;
            }
            .ftxt1{
              font-size:1rem;
            }
            .ftxt2{
              font-size:1.3rem;
            }
            .ftxt3{
              font-size:0.5rem;
            }
            & svg{
              transform: scale(0.50);
            }
            .fimg1{
              height:30%;
              margin-left:4%;
            }
            .maindiv{
              flex-direction:column;
            }
            .g1{
              width:60%;
            }
          }
          `
        }
      </style>
      <div className="maindiv" style={{backgroundColor:'#282828',color:'white',paddingTop:'40px',display:'flex',justifyContent:'space-between',paddingLeft:'8%',paddingRight:'8%'}}>
          <Grid className="g1" item sx={{width:'30%'}}>
            <img className='fimg1' src="/images/footlogo.png" alt="dotrestrosLogo" />
            <Box
              sx={{
                my: 3,
                "& svg": {
                  fontSize: "30px",
                  cursor: "pointer",
                  mr: 2,
                },
                "& svg:hover": {
                  color: "#2A88DF",
                  transform: "scale(1.2)",
                  transition: "all 400ms",
                },
              }}
            >
              <Grid container sx={{textAlign:'center'}}>
                <Grid item sx={{textAlign:'center', width:'25%'}}><Link style={{ textDecoration: "none", color:"white", textAlign:'center' }} to="https://www.instagram.com/dot_restros/"><InstagramIcon sx={{marginRight:'0px'}} className="ficon1" /></Link></Grid>
                <Grid item sx={{textAlign:'center', width:'25%'}}><Link style={{ textDecoration: "none", color:"white", textAlign:'center' }} to="https://twitter.com/dot_restros"><TwitterIcon sx={{marginRight:'0px'}} /></Link></Grid>
                <Grid item sx={{textAlign:'center', width:'25%'}}><Link style={{ textDecoration: "none", color:"white", textAlign:'center' }} to="https://www.linkedin.com/company/dot-restros"><LinkedInIcon sx={{marginRight:'0px'}} /></Link></Grid>
                <Grid item sx={{textAlign:'center', width:'25%'}}><Link style={{ textDecoration: "none", color:"white", textAlign:'center' }} to="https://www.facebook.com/people/DoT-Restros/100093948343294/"><FacebookIcon sx={{marginRight:'0px'}} /></Link></Grid>
              </Grid>
              <Typography className="ftxt3" sx={{textAlign:'center'}}>
                &copy; All Rights Reserved by DoT Restros 2023
              </Typography>

            </Box>

          </Grid>
              <Grid item>
                <Stack className="ftxt2" sx={{
                  color: "#2A88DF",
                  fontWeight: "bold",
                  fontSize: "20px",
                  paddingBottom: "5px",
                  marginBottom:'10px',
                }} spacing={4}>
                  COMPANY
                </Stack>
                <Link style={{ textDecoration: "none" }} to="/terms" ><Grid className="ftxt1">Terms & Conditions</Grid></Link>
                <Link style={{ textDecoration: "none" }} to="/privacy" ><Grid className="ftxt1">Privacy Policy</Grid></Link>
                <Link style={{ textDecoration: "none" }} to="/guest" ><Grid className="ftxt1">Guest Policy</Grid></Link>
                <Link style={{ textDecoration: "none" }} to="/cancellation" ><Grid className="ftxt1">Cancellation Policy</Grid></Link>

              </Grid>
              <Grid item>
                <Stack className="ftxt2" sx={{ color: "#2A88DF", fontWeight: "bold", fontSize: "20px", paddingBottom: "5px",marginBottom:'10px' }} spacing={2}>
                  QUICK LINKS
                </Stack>
                <Link style={{ textDecoration: "none" }} to="/" ><Grid className="ftxt1">Home</Grid></Link>
                <Link style={{ textDecoration: "none" }} to="/myorders" ><Grid className="ftxt1">My Orders</Grid></Link>
                <Link style={{ textDecoration: "none" }} to="/aboutus" ><Grid className="ftxt1">About Us</Grid></Link>
                <Link style={{ textDecoration: "none" }} to="/contactus" ><Grid className="ftxt1">Contact Us</Grid></Link>
              </Grid>
      </div>
    </>
  );
};

export default Footer;