import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import Dashboard from "../Dashboard/Dashboard";
import { useFirebaseAuth } from "../../store/auth-context";
import { collection, getDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import style from './Login.module.css'

function Login() {
  // const [authUser, setAuthUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [userType, setUserType] = useState();
  const [path, setPath] = useState();

  const authUser = useFirebaseAuth();
  const auth = getAuth();
  // const authCtx = useContext(AuthContext);
  // auth.onAuthStateChanged((user) => {
  //   console.log(user);
  // });
  const logIn = (e) => {
    setLoading(true);
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      // .then((userCredential) => {
      //   console.log(userCredential);
      // })
      .then(() => {
        setLoading(false);
        getData();
        console.log(path);
      })
      .catch((error) => {
        console.error(error);
      });

    // const docRef = doc(db, "myCollection", "myDocument");
    // const docSnap = await getDoc(docRef);

    // if (docSnap.exists()) {
    //   console.log("Document data:", docSnap.data());
    // } else {
    //   console.log("No such document!");
    // }
  };

  // useEffect(async () => {
  //   await getData();
  // }, []);

  const getData = () => {
    const collections = ["users/teacher/data", "users/student/data"];
    const docId = email;

    const promises = collections.map((collection) =>
      getDoc(doc(db, `${collection}/${docId}`))
    );

    Promise.all(promises)
      .then((snapshots) => {
        const data = snapshots.reduce((acc, snapshot) => {
          if (snapshot.exists()) {
            return { ...acc, ...snapshot.data() };
          }
          return acc;
        }, {});

        console.log(data);
        console.log(data.userType);
        setPath(`users/${data.userType}/data`);
        console.log(path);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Signed out successfully");
        // setLoading(true);
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className={style.Login}> 
    <div className="container col-md-6">
      {authUser ? (
        <>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <p>
                {`Logged In as ${authUser.email}`}
                <button
                  className="btn btn-sm btn-outline-warning"
                  onClick={userSignOut}
                >
                  LogOut
                </button>
              </p>
              <Dashboard collectionPath={path} currentUserEmail={email} />
            </>
          )}
        </>
      ) : (
        <form onSubmit={logIn} className={style.Login.form}>
          {/* <h1>LogIn</h1> */}
          <input
            className={style.Login.input &&"form-control"}
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className={style.Login.input &&"form-control"}
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn btn-lg btn-outline-secondary" type="submit">
            LogIn
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      )}
    </div>
    </div>
  );
}
export default Login;
