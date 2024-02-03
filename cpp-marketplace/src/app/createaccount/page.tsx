'use client'

import React from 'react';
import Navbar from '../../../components/Navbar';
import SignUp from "../../../components/SignUp";

const CreateAccount = () => {
    return (
        <div className="homepage-container">
        <div className="background-image"></div>
        <Navbar />
        <SignUp />
        {/* Other content of your app */}
        </div> 
    )
}

export default CreateAccount;


