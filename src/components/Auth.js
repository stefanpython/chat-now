import { auth } from "../firebase-config";
import { signInAnonymously } from "firebase/auth";
import { useState } from "react";
import Cookies from "universal-cookie";
import "./Auth.css";
const cookies = new Cookies();

export const Auth = (props) => {
  const { setIsAuth } = props;
  const [username, setUsername] = useState("");

  const signIn = async (e) => {
    e.preventDefault();
    try {
      const result = await signInAnonymously(auth);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);

      auth.currentUser.displayName = username;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="auth">
      <div className="welcome-container">
        <h1>Welcome to Chat Now</h1>
      </div>

      <p>Enter username to continue</p>
      <form className="login-form" onSubmit={signIn}>
        <input
          type="text"
          placeholder="Type in username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className="login-button" type="submit">
          Log in
        </button>
      </form>
    </div>
  );
};
