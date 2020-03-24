import React from "react";
import { AppState } from "../../store";
import { Message } from "../../store/chat/types";
import { connect } from "react-redux";

interface Props {
  messages: Message[];
}

const ChatHistory = ({ messages }: Props) => {
  return (
    <div className="chat-history">
      {messages.map(message => (
        <div className="message-item" key={message.timestamp}>
          <h3>From: {message.user}</h3>
          <p>{message.message}</p>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  messages: state.chat.messages
});

export default connect(mapStateToProps)(ChatHistory);
