import React, { useState, useReducer } from "react";

import {
  getAuth,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import UserType from "../UserType";
import AuthContext, { useFirebaseAuth } from "../../store/auth-context";
// import Dashboard from '../Dashboard';
import style from './SignUp.module.css'

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
};

function SignUp() {
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const [isSignedUp, setIsSignedUp] = useState(false);
  const authUser = useFirebaseAuth();
  const auth = getAuth();

  const signUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        emailState.value,
        passwordState.value
      );
      console.log(userCredential);
      setIsSignedUp(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={style.signUp}> 
    <div className="container col-md-6">
      {isSignedUp ? (
        <div className="container">
          <UserType email={emailState.value} />
        </div>
      ) : (
        <form onSubmit={signUp} className= {style.signUp.form}
        >
          {/* <h1>SignUp</h1> */}
          <input
            className={style.signUp.input &&"form-control"} 
            type="email"
            placeholder="Enter your email"
            value={emailState.value}
            onChange={(e) => emailChangeHandler(e)}
            onBlur={validateEmailHandler}
          />
          <input
            className={style.signUp.input &&"form-control"} 
            type="password"
            placeholder="Enter your password"
            value={passwordState.value}
            onChange={(e) => passwordChangeHandler(e)}
            onBlur={validatePasswordHandler}
          />
          <button className={style.signUp.button&&"btn btn-outline-danger btn-sm"} type="submit">
            SignUp
          </button>
        </form>
      )}
    </div>
    </div>
  );
}
export default SignUp;
