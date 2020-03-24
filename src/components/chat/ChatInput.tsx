import * as React from "react";
import { sendMessage } from "../../socket/send";
import { AppState } from "../../store";
import { connect } from "react-redux";
import { Message } from "../../store/chat/types";
import { useState } from "react";

interface ChatInputProps {
  socket: SocketIOClient.Emitter;
  username: string;
}

const ChatInput = ({ socket, username }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  function keyPress(e: React.KeyboardEvent<any>) {
    if (e.key === "Enter") {
      send();
    }
  }

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setMessage(e.currentTarget.value);
  };

  function send() {
    const msg: Message = {
      user: username,
      timestamp: new Date().getTime(),
      message
    };
    sendMessage(socket, msg);
    setMessage("");
  }

  return (
    <div className="chat-interface">
      <h3>User: {username} </h3>
      <input
        value={message}
        onChange={onChange}
        onKeyPress={keyPress}
        className="chat-input"
        placeholder="Type a message..."
      />
      <button onClick={send}>Send</button>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  username: state.system.username
});

export default connect(mapStateToProps)(ChatInput);
