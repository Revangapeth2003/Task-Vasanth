import React from 'react';
import { IoSettingsOutline } from 'react-icons/io5';
import { FaRegBell } from 'react-icons/fa';
import { CgProfile } from "react-icons/cg";

import '../App.css';


const Home = () => {
  return (
    <div>
      <div className='nav row'>
        <h3 className='icon col-10'>RS-TECH</h3>
        <div className='col-2 d-flex gap-3 ps-5'>
        <a href='' className='text-decoration-none text-black'>
        <IoSettingsOutline style={{ fontSize: '26px' }} /></a>
        <a href='' className='text-decoration-none text-black'>
        <FaRegBell style={{ fontSize: '26px' }} /></a>
        <a href='' className='text-decoration-none text-black'>
        <CgProfile style={{ fontSize: '26px' }} /></a>
        </div>
      </div>
    </div>
  );
};

export default Home;
