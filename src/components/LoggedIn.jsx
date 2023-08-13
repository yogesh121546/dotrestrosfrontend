import React, { useState } from 'react'
import { useParams } from "react-router-dom";

function LoggedIn() {
    const { code } = useParams()
    const saveToken = () => {
        localStorage.setItem('token', code);
        window.location.href = "https://dotrestros.netlify.app/"
    }
    saveToken();

    return (
        <div>
            <p>Successfully Logged In</p>
        </div>
    )
}

export default LoggedIn