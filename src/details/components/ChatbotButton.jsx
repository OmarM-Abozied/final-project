import React, { useState } from "react";
import { FaCommentAlt } from "react-icons/fa";
import "./ChatbotButton.css";


const Chatbot = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Icon */}
      <div className="chatbot" onClick={() => setOpen(!open)}>
        <FaCommentAlt size={24} />
      </div>

      {/* Chat Window */}
      {open && (
        <div className="chat-window">
          <div className="chat-header">
            <h4>Chat with us</h4>
            <button onClick={() => setOpen(false)}>✕</button>
          </div>
          <div className="chat-body">
            <p>Hello! How can I help you?</p>
          </div>
          <div className="chat-input">
            <input type="text" placeholder="Type a message..." />
            <button>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
