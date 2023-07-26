import { useState, useRef } from "react";
import styles from "./App.module.css"; // Import the CSS module
import { Auth } from "./components/Auth";
import Cookies from "universal-cookie";
import { Chat } from "./components/Chat";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);

  const roomInputRef = useRef(null);

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
  };

  const handleRoomEntry = (e) => {
    if (e.key === "Enter") {
      setRoom(roomInputRef.current.value);
    }
  };

  if (!isAuth) {
    return (
      <div className={styles.app}>
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }
  return (
    <div className={styles["room-container"]}>
      {room ? (
        <Chat room={room} />
      ) : (
        <div className={styles.room}>
          <label>Enter Room Name</label>
          <input ref={roomInputRef} onKeyDown={handleRoomEntry} />
          <button
            className={styles["enter-chat-btn"]}
            onClick={() => setRoom(roomInputRef.current.value)}
          >
            Enter Chat
          </button>

          <div className={styles["sign-out"]}>
            <button onClick={signUserOut}>Sign Out</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
