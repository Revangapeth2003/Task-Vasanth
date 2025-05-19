import React from 'react'
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { GrUserWorker } from "react-icons/gr";
import { IoCalendarOutline } from "react-icons/io5";
import { RiMessageLine } from "react-icons/ri";
import { Link } from "react-router-dom"; 
import '../App.css';

const Section = () => {
  return (
    <div>
      <div className="Section-1">
        <div className="section-item">
          
            <RiDashboardHorizontalLine />
            <p className="mb-0">Dashboard</p>
        </div>
        <div className="section-item">
          <Link
            to="/"
            className="d-flex align-items-center text-decoration-none text-black"
          >
            <GrUserWorker />
            <p className="mb-0">Employee</p>
          </Link>
        </div>
        <div className="section-item">
            <IoCalendarOutline />
            <p className="mb-0">Calendar</p>
        </div>
        <div className="section-item">
            <RiMessageLine />
            <p className="mb-0">Message</p>
        </div>
      </div>
    </div>
  );
};

export default Section;
