import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";
import "./Chat.css";
import { format } from "date-fns";
import { signOut } from "firebase/auth";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const Chat = (props) => {
  const { room } = props;
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  // eslint-disable-next-line
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [username, setUserName] = useState("");

  const messagesRef = collection(db, "messages");

  useEffect(() => {
    // Check the authentication status
    const authToken = cookies.get("auth-token");
    setIsAuth(!!authToken);

    // Retrieve the username from local storage after a page reload
    const storedUsername = localStorage.getItem("username");
    setUserName(storedUsername);
  }, []);

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return () => unsuscribe();
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newMessage === "") return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: username,
      room,
    });

    setNewMessage("");
  };

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);

    localStorage.removeItem("username");

    window.location.reload();
  };

  return (
    <div className="chat-app">
      <div className="header">
        <h1>Welcome to: {room.toUpperCase()}</h1>

        <div className="sign-out">
          <button onClick={signUserOut}>Sign Out</button>
        </div>
      </div>

      <div className="messages-container">
        {messages.map((message) => (
          <div className="message-content" key={message.id}>
            <span className="user">{message.user}: </span>
            <span className="message-text">{message.text} </span>
            <span className="message-date">
              - sent at: {""}
              {message.createdAt
                ? `${format(message.createdAt.toDate(), "HH:mm:ss dd-MM-yyyy")}`
                : ""}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          className="new-message-input"
          placeholder="Type your message here..."
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};
