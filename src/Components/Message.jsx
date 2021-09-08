import React from "react";
import "./Message.css";

function Message({ own, message }) {
  /* This Is to show message */
  return (
    /* Own is for the messages that user sent */
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <span className="messageText">{message.message}</span>
      </div>
    </div>
  );
}

export default Message;
