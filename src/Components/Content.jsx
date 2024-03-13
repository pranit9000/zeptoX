import React from 'react'
import './content.css'
// import './src/Components/content.css'
// import { RiArrowRightLine } from 'react-icons/ri'
import { Link } from 'react-router-dom';

function Content() {
  return (
    <section id="content">
      <div className="container content_container col-md-6">
        <div className="notes">
          <h4>WELCOME TO</h4>
          <h1>zeptoX Education<br />Learning & Earning</h1>
          <p>zeptoX make it easy for people to get help on almost any topic or skill they need to master.
          </p>
          <div className="content_cta">
            <Link to="/signup" className="content_btn btn btn-md btn-outline-secondary ">Get Started </Link><br />
            <a href="" className="content_btn">View Courses </a>
          </div>
        </div>
      </div>
    </section>
  );

}



export default Content

