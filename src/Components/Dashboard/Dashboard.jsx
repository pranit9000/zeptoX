import React, { useContext, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import emailjs from "@emailjs/browser";
import Users from "./Users";
function Dashboard(props) {
  console.log(props);
  const currentPath = props.collectionPath;
  const currentUserEmail = props.currentUserEmail;
  console.log(currentPath);
  const [pinCode, setPinCode] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const form = useRef();
  const handlePinCodeChange = (event) => {
    setPinCode(event.target.value);
  };

  const handleSubmit = () => {
    // fetchData();
    if (pinCode === "") {
      console.log(pinCode);
      return;
    }
    console.log("handle submit called");
    console.log(currentPath);
    const path = currentPath.includes("teacher")
      ? "users/student/data"
      : "users/teacher/data";
    console.log("path is set");
    getDocs(collection(db, path)).then((data) => {
      console.log(path);
      console.log("get docs called");
      // data.docs;
      // setStudents(data.docs.map((doc) => doc.data()));
      console.log("students set");

      setFilteredStudents(
        data.docs
          .map((doc) => doc.data())
          .filter((student) => student.pincode.includes(pinCode))
      );
      console.log("filtered studetn set");
    });
    // setFilteredStudents(
    //   students.filter((student) => student.pincode.includes(pinCode))
    // );
  };
  console.log("component re-rendered");
  console.log(filteredStudents);
  // ... state
  useEffect(() => emailjs.init("e1v34y55IRsEwGMS4"), []);
  // Add these

  return (
    // <div>
    //   {currentPath === "users/teacher/data" ? <Teachers /> : <Students />}
    // </div>
    <div className="">
      <input
        className="form-control"
        type="text"
        placeholder="Enter Pin Code"
        value={pinCode}
        onChange={handlePinCodeChange}
      />
      <button className="btn btn-md btn-primary" onClick={handleSubmit}>
        Submit
      </button>

      <ul>
        {filteredStudents.map((student) => (
          <li key={student.id}>
            <Users
              currentUser={student}
              currentPath={currentPath}
              currentUserEmail={currentUserEmail}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
