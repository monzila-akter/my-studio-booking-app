import React from 'react';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { Outlet } from 'react-router';
import { Toaster } from 'react-hot-toast';

const MainLayout = () => {
    return (
        <div>
            <Toaster></Toaster>
            <Navbar></Navbar>
            <div className='min-h-screen'>
            <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;