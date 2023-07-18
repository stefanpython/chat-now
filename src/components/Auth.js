import { auth } from "../firebase-config";
import { signInAnonymously } from "firebase/auth";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const Auth = () => {
  const signIn = async () => {
    try {
      const result = await signInAnonymously(auth);
      cookies.set("auth-token", result.user.refreshToken);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="auth">
      <p>Sign in Anonymously to continue</p>
      <button onClick={signIn}>Log in Anonymously</button>
    </div>
  );
};
