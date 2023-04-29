import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "../hooks/useAuthContext";
import LoginForm from "../components/LoginForm";

export default function Login() {
  const { dispatch, user } = useAuthContext();

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] =useState({value:false,msg:""})

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      setError({value:false,msg:""})
      signInWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
          console.log("signed in");
          const user = userCredential.user;
          dispatch({ type: "LOGIN", payload: user });
          if (user) {
            console.log(user);
            return navigate("/");
          }
        })
        .catch((error) => {
          setError({value:true,msg:"Incorrect username or password"})
        });
    }
    if(!username||!password){
       setError({value:true,msg:"Please fill all details"})
       console.log(error)
    }
  };

  return (
    <div className="login-page page">
      <LoginForm
        username={username}
        password={password}
        setPassword={setPassword}
        setUsername={setUsername}
        handleLogin={handleLogin}
        error={error}
      ></LoginForm>
    </div>
  );
}
