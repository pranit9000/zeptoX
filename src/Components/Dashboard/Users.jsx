import React, { useState } from "react";
import emailjs from "@emailjs/browser";

const Users = (props) => {
  const { currentUser, currentPath, currentUserEmail } = props;

  const [showInterestButton, setShowInterestButton] = useState(true);

  const emailSubmit = (student) => {
    console.log("hi");
    console.log(student);
    const serviceId = "service_oa8btcp";
    const templateId = "template_2ebuq8v";
    try {
      emailjs.send(serviceId, templateId, {
        useremail: student.name,
        message: `User ${currentUserEmail} has shown interest in ${student.name} with aadhar number ${student.aadhar} `,
      });
      alert("Email successfully sent. Please check your inbox.");
    } catch (error) {
      console.log(error);
    }
    setShowInterestButton(false);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>{currentPath.includes("teacher") ? "Student" : "Teacher"}</h2>
      </div>
      <div className="card-body">
        <h5 className="card-title">{currentUser.name}</h5>
        <p className="card-text">{currentUser.address}</p>
        {showInterestButton && (
          <button
            className="btn btn-primary"
            onClick={() => emailSubmit(currentUser)}
          >
            Show Interest
          </button>
        )}
      </div>
    </div>
  );
};

export default Users;
