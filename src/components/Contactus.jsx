import React from "react";
import Header from "./Header"
import Footer from "./Footer";

function Contactus(){
    return(
        <>
        <style>
            {`
                .amaindiv{
                    margin-top:5rem;
                    font-size:20px;
                    text-align:center;
                    background-color:#282828;
                    width:100%;
                    height:85vh;
                    color:white;
                    padding-top:3rem;

                }
                .clr{
                    color:#2a88df;
                }
                .info{
                    display:flex;
                    justify-content:space-evenly;
                    align-items:center;
                    margin-top:5rem;
                    font-weight:bold;
                    font-size:2rem;
                }
                .msg{
                    margin-top:5rem;
                    font-size:2rem;
                }

                .address{
                    font-size:2rem;
                    margin-top:5rem;
                    font-weight:bold;
                }

                .hvr{
                    transition:0.5s;
                }

                .hvr:hover{
                    color:#2a88df;
                }

                @media (max-width:1200px){
                    .amaindiv{
                        height:100vh;
                    }
                    .info{
                        flex-direction:column;
                        font-size:20px;
                        align-items:center;
                        justify-content:center;
                    }
                    .msg{
                        font-size:1rem;
                        margin-left: 20px;
                        margin-right: 20px;
                    }
                    .address{
                        font-size:20px;
                    }
                }
            `}
        </style>
        <Header />
            <div className="amaindiv">
                <h1 className="cu">Feel Free to Reach Us At!</h1>
                <div className="info">
                <div className="email hvr"><span className="clr">Email -</span> dotrestros@gmail.com</div>
                <div className="contac hvr"><span className="clr">Mobile no. -</span> 8799061992</div>
                <div className="instagram hvr"><span className="clr">Instagram -</span> @dot_restros</div>
                </div>
                <div className="address">
                <span className="clr">Address -</span>Kamrej Char Rasta, Surat, Gujarat <br />
                <span className="clr">Pin code -</span> 394185
                </div>
                <div className="msg">
                    Team at DoT Restros is constantly here to help you out with all your queries.
                </div>
            </div>
        <Footer />
        </>
    )
}

export default Contactus