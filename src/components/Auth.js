import { auth } from "../firebase-config";
import { signInAnonymously } from "firebase/auth";
import { useState } from "react";
import Cookies from "universal-cookie";
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
      <p>Enter username to log in</p>
      <form onSubmit={signIn}>
        <input
          type="text"
          placeholder="Type in username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};
