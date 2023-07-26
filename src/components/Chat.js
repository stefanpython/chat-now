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
import { auth, db, storage } from "../firebase-config";
import "./Chat.css";
import { format } from "date-fns";
import { signOut } from "firebase/auth";
import Cookies from "universal-cookie";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { uid } from "uid";

const cookies = new Cookies();

export const Chat = (props) => {
  const { room } = props;
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  // eslint-disable-next-line
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [username, setUserName] = useState("");

  // Image file upload
  const [selectedFile, setSelectedFile] = useState("");

  const messagesRef = collection(db, "messages");

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  // Save username to localStorage
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

    if (newMessage === "" && !selectedFile) return;

    // Upload the selected image to Firebase Storage
    let imageUrl = null;
    if (selectedFile) {
      const storageRef = ref(storage, `images/${selectedFile.name + uid()}`);
      await uploadBytes(storageRef, selectedFile);
      imageUrl = await getDownloadURL(storageRef);
    }

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: username,
      room,
      imageUrl,
    });

    setNewMessage("");
    setSelectedFile("");

    e.target.reset();
  };

  // Sign out user
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

            {message.imageUrl && (
              <>
                <br />
                <img
                  className="chat-image"
                  src={message.imageUrl}
                  alt="Uploaded"
                  style={{ maxWidth: 300 }}
                  onLoad={() => window.scrollTo(0, document.body.scrollHeight)}
                />
              </>
            )}
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

        <input
          id="file-input"
          className="file-input"
          type="file"
          onChange={handleFileInputChange}
        />

        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};
