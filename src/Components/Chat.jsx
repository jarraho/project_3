import React, { useEffect, useState, useRef } from "react";
import Conversation from "../Components/Conversation";
import Message from "../Components/Message";
import { useAuth } from "../Context/AuthContext";
import "./Chat.css";
import { db } from "../firebase";
import firebase from "firebase";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { currentUser } = useAuth();
  const scrollRef = useRef();

  useEffect(() => {
    //gets messages of users
    const getMessages = async () => {
      await db
        .collection("messages")
        .orderBy("createdAt")
        .limit(50)
        .onSnapshot((snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    };
    getMessages();
  }, [ ]);
  console.log("message are", messages);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newMessage === "") {
      return;
    }

    //Stores a message in the database
    try {
      //Have to fix conversation Id issues
      await db.collection("messages").add({
        senderId: currentUser.uid,
        message: newMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setNewMessage("");
      console.log("Message Sent");
      
    } catch (error) {
      console.log(error);
    }

    setNewMessage("");
  };

  return (
    <>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuContainer">
            {/* Maps out all the current convos */}
            <Conversation />
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxContainer">
            <div className="chatBoxTop">
              {/* Maps out all the messages */}
              {messages.map((message) => (
                <div ref={scrollRef}>
                  <Message
                    key={message.id}
                    own={message.data.senderId === currentUser.uid}
                    message={message.data}
                  />
                </div>
              ))}
            </div>

            {/* Chatbox */}
            <div className="chatBoxBottom">
              <input
                placeholder="Write Message..."
                className="chatMessageInput"
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
              />
              <button className="chatSendButton" onClick={handleSubmit}>
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
